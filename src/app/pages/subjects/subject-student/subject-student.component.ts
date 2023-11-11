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
import { Student } from 'src/app/shared/models/student';
import { AddSubjectByStudent } from 'src/app/shared/models/subject';

@Component({
  selector: 'app-subject-student',
  templateUrl: './subject-student.component.html',
  styleUrls: ['./subject-student.component.scss']
})
export class SubjectStudentComponent implements OnInit {

  @ViewChild('studentsInput') studentsInput!: ElementRef<HTMLInputElement>;
  subjectForm: FormGroup;
  studentOption: Student[] = [];
  params = new Params();
  filteredStudentOptions: Student[] = [];
  selectedStudents: string[] = [];
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
        studentId: ['', Validators.required],
      });

      this.subjectForm.patchValue({
        subjectId: data.data.subjectId,
      });
    } else {
      this.subjectForm = this.fb.group({
        studentId: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getStudents();
    this.subjectForm.get('studentId')?.valueChanges.subscribe((value) => {
      this.filteredStudentOptions = this.filterStudentsOptions(value);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedStudents.push(value);
    }
    event.chipInput!.clear();
    this.subjectForm.get('studentId')?.setValue(null);
    console.log(this.selectedStudents);
  }

  remove(studentId: string): void {
    this.isSave = false;
    const index = this.selectedStudents.indexOf(studentId);
  
    if (index >= 0) {
      this.selectedStudents.splice(index, 1);
  
      this.liveAnnouncer.announce(`Removed ${studentId}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.isSave = true;
    console.log(event.option.viewValue);
    this.selectedStudents.push(event.option.value);
    this.studentsInput.nativeElement.value = '';
    this.subjectForm.setValue([]);
  }

  getStudents() {
    this.commonService.getStudentsNotYetRegisterSubject(this.data.data.subjectId).subscribe({
        next: response => {
          console.log(response.data);
          this.studentOption = response.data;
        },
        error: error => console.log(error),
      })
  }

  filterStudentsOptions(value: string): Student[] {
    if (value === null || value === undefined) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.studentOption.filter((option) =>
      option.studentId.toLowerCase().includes(filterValue)
    );
  }

  onAddSubjectToStudents() {
    const subjectId = this.data.data.subjectId;
    let studentIds: string[] = [];
    for(let iStudent of this.studentOption){
      for( let studentId of this.selectedStudents){
        if(studentId === iStudent.studentId) {
          studentIds.push(iStudent.studentId);
        }
      }
    }

    this.subjectService.addSubjectForStudent(subjectId, new AddSubjectByStudent(studentIds)).subscribe({
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
