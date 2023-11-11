import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEdit, faTrash, faUserPlus, faRegistered, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { SubjectService } from './subject.service';
import { Params } from 'src/app/shared/models/params';
import { Subject } from 'src/app/shared/models/subject';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SubjectManagerComponent } from './subject-manager/subject-manager.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectClassComponent } from './subject-class/subject-class.component';
import { SubjectStudentComponent } from './subject-student/subject-student.component';
import { ScoreService } from '../scores/score.service';
import * as saveAs from 'file-saver';



@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  @ViewChild('dataTable') table!: DatatableComponent;
  faTrash = faTrash;
  faEdit = faEdit;
  faUserPlus = faUserPlus;
  faRegistered = faRegistered;
  faFileExport = faFileExport;

  SelectionType = SelectionType;
  selected: Subject[] = [];
  subjects: Subject[] = [];
  params = new Params();
  isDelete: boolean = false;
  totalCount = 0;

  constructor(
    private snackBar: MatSnackBar,
    private subjectService: SubjectService,
    private scoresService : ScoreService,
    private dialog: MatDialog,) { }

  columns = [{ name: 'Subject Id' }, { name: 'Subject Name' }, { name: 'Credit' }, { name: 'Count Students' }, { name: 'action' }];

  ngOnInit(): void {
    this.params.offset = 0;
    this.getSubject();
  }

  getSubject() {
    this.subjectService.getSubject(this.params).subscribe({
      next: response => {
        this.subjects = response.data.content;
        this.params.offset = response.data.offset;
        this.params.limit = response.data.limit;
        this.totalCount = response.data.count;
        this.table.recalculate();
      },
      error: error => console.log(error),
    })
  }

  // delete one subject
  onDeleteOneSubject(id: number): void {
    let ids = [id];
    console.log(ids);
    this.subjectService.deleteSubjects(ids).subscribe(
      (result) => {
        console.log('Delete subject successfully', result);
        this.showSnackbar('Delete subject successfully');
        this.reloadTable();
      },
      (error) => {
        console.error('Error deleting students', error);
      }
    );
  }

  // delete many subject
  onDeleteStudents() {
    let ids: number[] = [];
    for (let i = 0; i < this.selected.length; i++) {
      ids.push(this.selected[i].subjectId);
    }

    if (ids.length) {
      this.subjectService.deleteSubjects(ids).subscribe(
        (result) => {
          console.log('Delete subjects successfully', result);
          this.showSnackbar('Delete subjects successfully');
          this.reloadTable();
        },
        (error) => {
          console.error('Error deleting subject', error);
        }
      )
    }
  }


  onPageChanged(event: any) {
    if (event && this.params.offset !== event.page)
      this.params.offset = event.offset;
    this.getSubject();
  }

  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getSubject();
  }

  onSelect({ selected }: { selected: Subject[] }) {
    if (selected) this.isDelete = true;
    this.selected = selected;
    this.isDelete = this.selected.length > 0;
  }

  openAddSubjectModal() {
    const dialogRef = this.dialog.open(SubjectManagerComponent, {
      width: '500px',
      height: '290px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubject();
    });
  }

  openUpdateSubjectModal(data: Subject) {
    const dialogRef = this.dialog.open(SubjectManagerComponent, {
      width: '500px',
      height: '360px',
      data: { data },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubject();
    })
  }

  onExportPDFScoreForSubject(subjectId: number, subjectName: string) {
    this.scoresService.exportPDFForSubject(subjectId).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `BangDiemMon_${subjectName}.pdf`);
        this.showSnackbar('Export file PDF success');
      },
      (error: ArrayBuffer) => {
        this.showSnackbar('Scores is empty to export');
      }
    )
  }

  onExportExcelScoreForSubject(subjectId: number, subjectName: string) {
    this.scoresService.exportExcelForSubject(subjectId).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        saveAs(blob, `DSSV_${subjectName}.xlsx`);
        this.showSnackbar('Export file Excel success');
      },
      (error: ArrayBuffer) => {
        this.showSnackbar('Student is empty to export');
      }
    )
  }

  openAddClassModal(data: Subject) {
    const dialogRef = this.dialog.open(SubjectClassComponent, {
      width: '700px',
      data: { data },
      panelClass: 'dialog-content-auto-height',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubject();
    })
  }

  openAddStudentsModal(data: Subject) {
    const dialogRef = this.dialog.open(SubjectStudentComponent, {
      width: '700px',
      data: { data },
      panelClass: 'dialog-content-auto-height',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubject();
    })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }

  public reloadTable() {
    this.table.rows = this.getSubject();
    this.table.recalculate();
  }
}
