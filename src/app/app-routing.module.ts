import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './pages/classes/classes.component';
import { StudentsComponent } from './pages/students/students.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { ScoresComponent } from './pages/scores/scores.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'class', component: ClassesComponent, canActivate:[AuthGuard], data: {requiredRole: 'ROLE_ADMIN'}},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], data: {requiredRole: 'ROLE_ADMIN'}},
  {path: 'student', component: StudentsComponent, canActivate:[AuthGuard], data: {requiredRole: 'ROLE_ADMIN'}},
  {path: 'subject', component: SubjectsComponent, canActivate:[AuthGuard], data: {requiredRole: 'ROLE_ADMIN'}},
  {path: 'scores', component: ScoresComponent, canActivate:[AuthGuard], data: {requiredRole: 'ROLE_ADMIN'}},
  {path: 'login', component: AuthComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
