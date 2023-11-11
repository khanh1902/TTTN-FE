import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { faTrash, faEdit, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { DeleteScoresDTO, Scores } from 'src/app/shared/models/scores';
import { Params } from 'src/app/shared/models/params';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScoreService } from './score.service';
import { MatDialog } from '@angular/material/dialog';
import { ScoresManagerComponent } from './scores-manager/scores-manager.component';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  @ViewChild("dataTable") table!: DatatableComponent;
  @ViewChild('search') searchTerm?: ElementRef;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;
  faClose = faClose;
  isDelete: boolean = false;
  scores: Scores[] = [];
  params = new Params();
  SelectionType = SelectionType;
  totalCount = 0;
  selected: Scores[] = [];
  columns = [{ name: 'Student Id' }, { name: 'Student Name' }, { name: 'Subject Id' }, { name: 'Subject Name' }, { name: 'Class Name' }, { name: 'Scores' }];

  constructor(
    private snackBar: MatSnackBar,
    private scoresService: ScoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores() {
    this.scoresService.getScore(this.params).subscribe({
      next: response => {
        this.scores = response.data.content;
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
    this.getScores();
  }

  openUpdateScoresModal(data: Scores) {
    const dialogRef = this.dialog.open(ScoresManagerComponent, {
      width: '500px',
      data: { data },
      panelClass: 'dialog-content-auto-height',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getScores();
    })
  }

  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getScores();
  }

  onSelect({ selected }: { selected: Scores[] }) {
    if (selected) this.isDelete = true;
    this.selected = selected;
    this.isDelete = this.selected.length > 0;
    console.log(selected);
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 1500,
      verticalPosition: 'bottom',
    });
  }

  reloadTable() {
    this.table.rows = this.getScores();
    this.table.recalculate();
  }

  onDeleteOneScores(studentId: string, subjectId: number): void {
    const body:  DeleteScoresDTO[] = [];
    body.push(new DeleteScoresDTO(studentId, subjectId))
    this.scoresService.deleteScores(body).subscribe(
      (result) => {
        console.log('Delete scores successfully', result);
        this.showSnackbar('Delete scores successfully');
        this.reloadTable();
      },
      (error) => {
        console.error('Error deleting scores', error);
      }
    );
  }

  onDeleteScores(): void {
    const body:  DeleteScoresDTO[] = [];
    for(let i = 0; i<this.selected.length;i++){
      body.push(new DeleteScoresDTO(this.selected[i].studentId, this.selected[i].subjectId))
    }
    this.scoresService.deleteScores(body).subscribe(
      (result) => {
        console.log('Delete scores successfully', result);
        this.showSnackbar('Delete scores successfully');
        this.reloadTable();
      },
      (error) => {
        console.error('Error deleting scores', error);
      }
    );
  }
}
