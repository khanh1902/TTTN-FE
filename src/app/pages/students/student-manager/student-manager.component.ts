import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StudentsService } from '../students.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from 'src/app/shared/models/class';
import { Params } from 'src/app/shared/models/params';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Student } from 'src/app/shared/models/student';
import { StudentDTO } from 'src/app/shared/dtos/studentDTO';



@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.scss'],
})
export class StudentManagerComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean = false;
  classOptions: Class[] = [];
  params = new Params();
  filteredClassOptions: Class[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private studentService: StudentsService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.data.studentId) {
      this.isEditMode = true;
      this.studentForm = this.fb.group({
        studentId: ['', Validators.required],
        studentName: ['', Validators.required],
        studentAddress: ['', Validators.required],
        className: ['', Validators.required],
      });

      this.studentForm.patchValue({
        studentId: data.data.studentId,
        studentName: data.data.studentName,
        studentAddress: data.data.studentAddress,
        className: data.data.className,
      });
    } else {
      this.studentForm = this.fb.group({
        studentName: ['', Validators.required],
        studentAddress: ['', Validators.required],
        className: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getClass();
    this.filteredClassOptions = this.filterClassOptions(''); 
    this.studentForm.get('className')?.valueChanges.subscribe((value) => {
      this.filteredClassOptions = this.filterClassOptions(value);
    });
  }

  filterClassOptions(value: string): Class[] {
    const filterValue = value.toLowerCase();
    return this.classOptions.filter((option) =>
      option.className.toLowerCase().includes(filterValue)
    );
  }

  onClassOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.studentForm.get('className')?.setValue(event.option.viewValue);
  }

  getClass() {
    this.studentService.getClass(this.params).subscribe({
      next: response => {
        this.classOptions = response.data.content;
      },
      error: error => console.log(error),
    })
  }

  addOrUpdateStudent() {
    const studentData = this.studentForm.value;
    if (!this.data?.data) {
      this.studentService.addStudent(studentData).subscribe(
        (response) => {
          console.log('Student added successfully', response);
          this.showSnackbar('Add Student Success');
        },
        (error) => {
          console.error('Error adding student', error);
        }
      );

    } else {
      const student = new StudentDTO(studentData.studentName, studentData.studentAddress, studentData.className);
      console.log(student);
      this.studentService.updateStudent(this.data.data.studentId, student).subscribe(
        (response) => {
          console.log('Student Update successfully', response);
          this.showSnackbar('Update Student Success');
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
