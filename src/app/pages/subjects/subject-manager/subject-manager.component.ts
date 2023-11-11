import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Params } from 'src/app/shared/models/params';
import { SubjectService } from '../subject.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.scss']
})
export class SubjectManagerComponent implements OnInit {
  subjectForm: FormGroup;
  isEditMode: boolean = false;
  params = new Params();

  constructor(
    private snackBar: MatSnackBar,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.data.subjectId) {
      this.isEditMode = true;
      this.subjectForm = this.fb.group({
        subjectId: ['', Validators.required],
        subjectName: ['', Validators.required],
        credit: ['', Validators.required],
      });

      this.subjectForm.patchValue({
        subjectId: data.data.subjectId,
        subjectName: data.data.subjectName,
        credit: data.data.credit,
      });
    } else {
      this.subjectForm = this.fb.group({
        subjectName: ['', Validators.required],
        credit: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
  }

  addOrUpdateSubject() {
    const subjectData = this.subjectForm.value;
    if (!this.data?.data) {
      this.subjectService.addSubject(subjectData).subscribe(
        (response) => {
          console.log('Add subject successfully', response);
          this.showSnackbar('Add subject Success');
        },
        (error) => {
          this.showSnackbar(error.message)
        }
      );

    } else {
      this.subjectService.updateSubject(this.data.data.subjectId, subjectData).subscribe(
        (response) => {
          console.log('Update subject successfully', response);
          this.showSnackbar('Update subject Success');
        },
        (error) => {
          this.showSnackbar(error.message)
        }
      );
    }
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1500,
      verticalPosition: 'bottom',
    });
  }
}
