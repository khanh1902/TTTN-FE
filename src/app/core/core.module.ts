import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TablesComponent } from './tables/tables.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms'; 
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    TablesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    NavBarComponent,
    FontAwesomeModule,
    TablesComponent,
  ]
})
export class CoreModule { }
