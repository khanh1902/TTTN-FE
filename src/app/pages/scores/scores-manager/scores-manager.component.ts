import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Params } from 'src/app/shared/models/params';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScoreService } from '../score.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-scores-manager',
  templateUrl: './scores-manager.component.html',
  styleUrls: ['./scores-manager.component.scss']
})
export class ScoresManagerComponent implements OnInit {
  scoresForm: FormGroup;
  isEditMode: boolean = false;
  params = new Params();

  constructor(
    private snackBar: MatSnackBar,
    private scoresService: ScoreService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    if (data && data.data.studentId) {
      // If student data is provided with studentId, it's an update
      this.isEditMode = true;
      this.scoresForm = this.fb.group({
        studentId: ['', Validators.required],
        subjectName: ['', Validators.required],
        scores: ['', Validators.required, [this.asyncCustomScoreValidator()]],
      });

      // Pre-fill the form fields with data
      this.scoresForm.patchValue({
        studentId: data.data.studentId,
        subjectName: data.data.subjectName,
        scores: data.data.scores,
      });
    } else {
      this.scoresForm = this.fb.group({
        studentId: ['', Validators.required],
        subjectName: ['', Validators.required],
        scores: ['', Validators.required, [this.asyncCustomScoreValidator()]],
      });
    }
  }

  ngOnInit(): void {
  }

  updateScores() {
    const scoresData = this.scoresForm.value;
    if (this.data?.data) {
      this.scoresService.updateScores(
        this.data.data.studentId, 
        this.data.data.subjectId, 
        scoresData.scores
      ).subscribe(
        (response) => {
          console.log('Update Scores successfully', response);
          this.showSnackbar('Update Scores Success');
        },
        (error) => {
          console.error('Error updating Scores', error);
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

  asyncCustomScoreValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const score = Number(control.value);
      if (isNaN(score) || score > 10) {
        this.isEditMode = false;
        return of({ 'invalidScore': true });
      } else {
        return of(null);
      }
    };
  }

}
