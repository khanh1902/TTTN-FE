import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SubjectService } from './subject.service';
import { TableColumn } from 'src/app/core/tables/tables.component';
import { ISubject } from 'src/app/shared/models/subject';
import { Params } from 'src/app/shared/models/params';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private subjectService: SubjectService) { }
 
  // mai fix
  columns: TableColumn<ISubject>[] = [
    { propertyName: 'subjectId', displayName: 'ID' },
    { propertyName: 'subjectName', displayName: 'Name' },
    { propertyName: 'credit', displayName: 'Credit' }
  ];
  totalCount = 0;

  subjects: ISubject[] = [];
  params = new Params();

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject() {
    this.subjectService.getSubject(this.params).subscribe({
      next: response => {
        this.subjects = response.data.content;
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
      this.getSubject();
    }
  }
}
