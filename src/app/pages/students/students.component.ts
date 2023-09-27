import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StudentsService } from './students.service';
import { IStudent } from 'src/app/shared/models/student';
import { TableColumn  } from 'src/app/core/tables/tables.component';
import { Params } from 'src/app/shared/models/params';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private studentService: StudentsService) { }

  columns: TableColumn<IStudent>[] = [
    { propertyName: 'id', displayName: 'ID' },
    { propertyName: 'studentName', displayName: 'Name' },
    { propertyName: 'studentAddress', displayName: 'Address' },
    { propertyName: 'className', displayName: 'Class Name' },
  ];
  totalCount = 0;

  students: IStudent[] = [];
  params = new Params();

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents(this.params).subscribe({
      next: response => {
        this.students = response.data.content;
        this.params.pageIndex = response.data.pageIndex;
        this.params.pageSize = response.data.pageSize;
        this.totalCount = response.data.count;
      },
      error: error => console.log(error),
    })
  }

  onPageChanged(event: any) {
    if (this.params.pageIndex !== event.page) {
      this.params.pageIndex = event.page;
      this.getStudents();
    }
  }
  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getStudents();
  }
}