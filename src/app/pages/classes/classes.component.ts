import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faTrash, faEdit, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { ClassesService } from './classes.service';
import { Params } from 'src/app/shared/models/params';
import { Class } from 'src/app/shared/models/class';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { ClassManagerComponent } from './class-manager/class-manager.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as saveAs from 'file-saver';




@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @ViewChild("dataTable") table!: DatatableComponent;
  @ViewChild('search') searchTerm?: ElementRef;
  faTrash = faTrash;
  faEdit = faEdit;
  faFileExport = faFileExport;
  isDelete: boolean = false;
  classes: Class[] = [];
  params = new Params();
  SelectionType = SelectionType;
  totalCount = 0;
  selected: Class[] = [];
  
  constructor(
    private snackBar: MatSnackBar,
    private classesService: ClassesService,
    private dialog: MatDialog
  ) { }


  columns = [{ name: 'Class Id' }, { name: 'Class Name' }, { name: 'Count Students' }, { name: 'School Year' }];

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.classesService.getClass(this.params).subscribe({
      next: response => {
        this.classes = response.data.content;
        this.params.offset = response.data.offset;
        this.params.limit = response.data.limit;
        this.totalCount = response.data.count;
        this.table.recalculate();
      },
      error: error => console.log(error),
    })
  }

  onPageChanged(event: any) {
    if (event && this.params.offset !== event.page)
      this.params.offset = event.offset;
    this.getClasses();
  }

  openAddClassModal() {
    const dialogRef = this.dialog.open(ClassManagerComponent, {
      width: '500px',
      height: '280px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClasses();
    })
  }

  openUpdateClassModal(data: Class) {
    const dialogRef = this.dialog.open(ClassManagerComponent, {
      width: '500px',
      height: '370px',
      data: { data },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClasses();
    })
  }

  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getClasses();
  }

  onSelect({ selected }: { selected: Class[] }) {
    if (selected) this.isDelete = true;
    this.selected = selected;
    this.isDelete = this.selected.length > 0;
  }

  deleteOneClass(id: number): void {
    let ids = [id];
    this.classesService.deleteClasses(ids).subscribe(
      (result) => {
        console.log('Delete class successfully', result);
        this.showSnackbar('Delete class successfully');
        this.reloadTable();
      },
      (error) => {
        console.error('Error deleting students', error);
      }
    );
  }

  onDeleteClasses() {
    let ids: number[] = [];
    for (let i = 0; i < this.selected.length; i++) {
      ids.push(this.selected[i].classId);
      console.log(this.selected[i].classId);
    }

    if (ids.length) {
      this.classesService.deleteClasses(ids).subscribe(
        (result) => {
          console.log('Delete classes successfully', result);
          this.showSnackbar('Delete classes successfully');
          this.reloadTable();
        },
        (error) => {
          console.error('Error deleting students', error);
        }
      )
    }
  }

  onExportPDFListStudent(className: string) {
    this.classesService.exportPDFClass(className).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `DSSV_${className}.pdf`);
        this.showSnackbar('Export file PDF success');
      },
      (error: ArrayBuffer) => {
        this.showSnackbar('Student is empty to export');
      }
    )
  }

  onExportExcelListStudent(className: string) {
    this.classesService.exportExcelClass(className).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        saveAs(blob, `DSSV_${className}.xlsx`);
        this.showSnackbar('Export file Excel success');
      },
      (error: ArrayBuffer) => {
        this.showSnackbar('Student is empty to export');
      }
    )
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }

  reloadTable() {
    this.table.rows = this.getClasses();
    this.table.recalculate();
  }
}
