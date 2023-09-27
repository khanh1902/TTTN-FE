import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { StudentsComponent } from './pages/students/students.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { ScoresComponent } from './pages/scores/scores.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'class', component: ClassesComponent},
  {path: 'student', component: StudentsComponent},
  {path: 'subject', component: SubjectsComponent},
  {path: 'scores', component: ScoresComponent},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
