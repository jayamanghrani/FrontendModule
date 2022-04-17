import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from 'src/app/search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule,MatTableModule, MatPaginatorModule , MatSortModule } from '@angular/material';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';


export const ROUTES: Routes = [{path:'',component:SearchComponent}]


 
@NgModule({
  declarations: [SearchComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,  
    MatTableModule, 
    MatPaginatorModule, 
    Ng4LoadingSpinnerModule.forRoot(),
  ]
})
export class SearchModule { }
