import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesComponent } from './classes/classes.component';
import { CoreModule } from '../core/core.module';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ScoresComponent } from './scores/scores.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ClassesComponent,
    StudentsComponent,
    SubjectsComponent,
    ScoresComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    ClassesComponent,
    StudentsComponent,
    SharedModule,
    SubjectsComponent,
    ScoresComponent,
  ]
})
export class PagesModule { }
