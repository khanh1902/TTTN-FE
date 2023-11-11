import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faTrash, faEdit, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { StudentsService } from './students.service';
import { Params } from 'src/app/shared/models/params';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Student } from 'src/app/shared/models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentManagerComponent } from './student-manager/student-manager.component';
import { Class } from 'src/app/shared/models/class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { ScoreService } from '../scores/score.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  @ViewChild('dataTable') table!: DatatableComponent;
  faTrash = faTrash;
  faEdit = faEdit;
  faFileExport = faFileExport;
  SelectionType = SelectionType;
  selected: Student[] = [];
  students: Student[] = [];
  params = new Params();
  classOptions: Class[] = [];
  isDelete: boolean = false;
  totalCount = 0;

  constructor(
    private snackBar: MatSnackBar,
    private studentService: StudentsService,
    private scoresService: ScoreService,
    private dialog: MatDialog,
  ) { }

  columns = [{ name: 'Student Id' }, { name: 'Student Name' }, { name: 'Student Address' }, { name: 'Class Name' }, { name: 'action' }];

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents(this.params).subscribe({
      next: response => {
        this.students = response.data.content;
        this.params.offset = response.data.offset;
        this.params.limit = response.data.limit;
        this.totalCount = response.data.count;
        this.table.recalculate();
      },
      error: error => console.log(error),
    })
  }

  deleteStudent(id: string): void {
    let ids = [id];
    console.log(ids);
    this.studentService.deleteStudents(ids).subscribe(
      (result) => {
        console.log('Students deleted successfully', result);
        this.showSnackbar('Delete student successfully');
        this.reloadTable()
      },
      (error) => {
        console.error('Error deleting students', error);
      }
    );
  }

  onPageChanged(event: any) {
    if (event && this.params.offset !== event.page)
      this.params.offset = event.offset;
    this.getStudents();
  }

  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getStudents();
  }

  onSelect({ selected }: { selected: Student[] }) {
    if (selected) this.isDelete = true;
    this.selected = selected;
    this.isDelete = this.selected.length > 0;
  }

  onDeleteStudents() {
    let ids: string[] = [];
    for (let i = 0; i < this.selected.length; i++) {
      ids.push(this.selected[i].studentId);
      console.log(this.selected[i].studentId);
    }

    if (ids.length) {
      this.studentService.deleteStudents(ids).subscribe(
        (result) => {
          console.log('Delete students successfully', result);
          this.showSnackbar('Delete student successfully');
          this.reloadTable();
        },
        (error) => {
          console.error('Error deleting students', error);
        }
      )
    }
  }

  openAddStudentModal() {
    const dialogRef = this.dialog.open(StudentManagerComponent, {
      width: '500px',
      height: '360px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getStudents();
    });
  }
  
  openUpdateStudentModal(data: Student) {
    const dialogRef = this.dialog.open(StudentManagerComponent, {
      width: '500px',
      height: '440px',
      data: { data },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getStudents();
    });
  }

  onExportPDFListStudent() {
    this.studentService.exportPDFListStudent().subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, 'DSSV.pdf');
        this.showSnackbar('Export file PDF success');
      },
    )
  }

  onExportExcelListStudent() {
    this.studentService.exportExcelListStudent().subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        saveAs(blob, 'DSSV.xlsx');
        this.showSnackbar('Export file Excel success');
      },
    )
  }

  onExportPDFScores(studentId: string) {
    this.scoresService.exportPDFForStudent(studentId).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `DiemSV_${studentId}.pdf`);
        this.showSnackbar('Export file PDF success');
      },
      (error: ArrayBuffer) => {
        this.showSnackbar('Scores is empty to export');
      }
    )
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      verticalPosition: 'bottom',
    });
  }

  closeDialogAndReload() {
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  reloadTable() {
    this.table.rows = this.getStudents();
    this.table.recalculate();
  }
}