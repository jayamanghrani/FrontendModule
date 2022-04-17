import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
   MatNativeDateModule, MatRadioModule,MatButtonModule,MatIconModule,MatTableModule, 
   MatPaginatorModule , MatSortModule } from '@angular/material';

   import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
   
export const ROUTES: Routes = [{path:'',component:HomeComponent}]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule , 
    MatSortModule ,
    MatRadioModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ]
    

})
export class HomeModule { }
