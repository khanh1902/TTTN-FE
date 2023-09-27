import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClassesService } from './classes.service';
import { TableColumn } from 'src/app/core/tables/tables.component';
import { IClass } from 'src/app/shared/models/class';
import { Params } from 'src/app/shared/models/params';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit{
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private classesService: ClassesService) { }


  columns: TableColumn<IClass>[] = [
    { propertyName: 'classId', displayName: 'ID' },
    { propertyName: 'className', displayName: 'Name' },
    { propertyName: 'schoolYear', displayName: 'School Year' }
  ];
  totalCount = 0;

  classes: IClass[] = [];
  params = new Params();

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.classesService.getClass(this.params).subscribe({
      next: response => {
        this.classes = response.data.content;
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
      this.getClasses();
    }
  }
}
