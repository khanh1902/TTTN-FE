import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClassesService } from '../classes.service';
import { Params } from 'src/app/shared/models/params';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-class-manager',
  templateUrl: './class-manager.component.html',
  styleUrls: ['./class-manager.component.scss']
})
export class ClassManagerComponent implements OnInit {
  classForm: FormGroup;
  isEditMode: boolean = false;
  params = new Params();

  constructor(
    private snackBar: MatSnackBar,
    private classService: ClassesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.data.classId) {
      // If student data is provided with studentId, it's an update
      this.isEditMode = true;
      this.classForm = this.fb.group({
        classId: ['', Validators.required],
        className: ['', Validators.required],
        schoolYear: ['', Validators.required],
      });

      // Log the form before patching data
      console.log("Form before patching data: ", this.classForm.value);

      // Pre-fill the form fields with data
      this.classForm.patchValue({
        classId: data.data.classId,
        className: data.data.className,
        schoolYear: data.data.schoolYear,
      });

      // Log the form after patching data
      console.log("Form after patching data: ", this.classForm.value);
    } else {
      // If no studentId is provided, it's a new student

      this.classForm = this.fb.group({
        className: ['', Validators.required],
        schoolYear: ['', Validators.required],
      });
      console.log("Form after patching data: ", this.classForm.value);
    }
  }
  ngOnInit(): void {
  }

  addOrUpdateClass() {
    const studentData = this.classForm.value;
    if (!this.data?.data) {
      this.classService.addClass(studentData).subscribe(
        (response) => {
          console.log('Student added successfully', response);
          this.showSnackbar('Add Class Success');

        },
        (error) => {
          console.error('Error adding student', error);
        }
      );

    } else {
      this.classService.updateClass(this.data.data.classId, studentData).subscribe(
        (response) => {
          console.log('Update student successfully', response);
          this.showSnackbar('Update Class Success');
        },
        (error) => {
          console.error('Error updating student', error);
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
