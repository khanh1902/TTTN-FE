import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Class } from 'src/app/shared/models/class';
import { Params } from 'src/app/shared/models/params';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { SubjectService } from '../subject.service';
import { CommonService } from '../../common.service';
import { AddSubjectByClass } from 'src/app/shared/models/subject';

@Component({
  selector: 'app-subject-class',
  templateUrl: './subject-class.component.html',
  styleUrls: ['./subject-class.component.scss',
  ]
})
export class SubjectClassComponent implements OnInit {
  @ViewChild('classesInput') classesInput!: ElementRef<HTMLInputElement>;
  subjectForm: FormGroup;
  classOptions: Class[] = [];
  params = new Params();
  filteredClassOptions: Class[] = [];
  selectedClasses: string[] = [];
  announcer = Inject(LiveAnnouncer);
  isSave: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private liveAnnouncer: LiveAnnouncer,
    private subjectService: SubjectService,
    private commonService: CommonService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.data.subjectId) {
      this.subjectForm = this.fb.group({
        className: ['', Validators.required],
        studentId: ['', Validators.required],
      });

      this.subjectForm.patchValue({
        subjectId: data.data.subjectId,
      });
    } else {
      this.subjectForm = this.fb.group({
        className: ['', Validators.required],
        studentId: ['', Validators.required],
      });
    }

  }


  ngOnInit(): void {
    this.getClass();
    this.subjectForm.get('className')?.valueChanges.subscribe((value) => {
      this.filteredClassOptions = this.filterClassOptions(value);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedClasses.push(value);
    }
    event.chipInput!.clear();
    this.subjectForm.get('className')?.setValue(null);
    console.log(this.selectedClasses);
  }

  remove(className: string): void {
    this.isSave = false;
    const index = this.selectedClasses.indexOf(className);
  
    if (index >= 0) {
      this.selectedClasses.splice(index, 1);
  
      this.liveAnnouncer.announce(`Removed ${className}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.isSave = true;
    console.log(event.option.viewValue);
    this.selectedClasses.push(event.option.value);
    this.classesInput.nativeElement.value = '';
    this.subjectForm.setValue([]);
  }

  getClass() {
    this.commonService.getClassesNotYetRegisterSubject(this.data.data.subjectId).subscribe({
        next: response => {
          console.log(response.data);
          this.classOptions = response.data;
        },
        error: error => console.log(error),
      })
  }

  filterClassOptions(value: string): Class[] {
    if (value === null || value === undefined) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.classOptions.filter((option) =>
      option.className.toLowerCase().includes(filterValue)
    );
  }

  onAddSubjectToClass() {
    const subjectId = this.data.data.subjectId;
    let classIds: number[] = [];
    for(let iClass of this.classOptions){
      for( let className of this.selectedClasses){
        if(className === iClass.className) {
          classIds.push(iClass.classId);
        }
      }
    }

    this.subjectService.addSubjectForClass(subjectId, new AddSubjectByClass(classIds)).subscribe({
      next: response => {
        this.showSnackbar(response.message)
      },
      error: error => {
        this.showSnackbar(error.error.message)
      }
    })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1500,
      verticalPosition: 'bottom',
    });
  }
}
