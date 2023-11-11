import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ClassesComponent } from './classes/classes.component';
import { CoreModule } from '../core/core.module';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ScoresComponent } from './scores/scores.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassManagerComponent } from './classes/class-manager/class-manager.component';
import { StudentManagerComponent } from './students/student-manager/student-manager.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SubjectManagerComponent } from './subjects/subject-manager/subject-manager.component';
import { SubjectClassComponent } from './subjects/subject-class/subject-class.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { SubjectStudentComponent } from './subjects/subject-student/subject-student.component';
import { ScoresManagerComponent } from './scores/scores-manager/scores-manager.component';
import { AuthComponent } from './auth/auth.component';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ClassesComponent,
    DashboardComponent,
    StudentsComponent,
    SubjectsComponent,
    ScoresComponent,
    ClassManagerComponent,
    StudentManagerComponent,
    SubjectManagerComponent,
    SubjectClassComponent,
    SubjectStudentComponent,
    ScoresManagerComponent,
    AuthComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    NgxDatatableModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatMenuModule,
    MatCardModule,
    CanvasJSAngularChartsModule,
    MatGridListModule,
  ],
  exports: [
    ClassesComponent,
    StudentsComponent,
    SharedModule,
    SubjectsComponent,
    DashboardComponent,
    ScoresComponent,
  ]
})
export class PagesModule { }
