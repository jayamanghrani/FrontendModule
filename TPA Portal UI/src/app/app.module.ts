import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';


import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { HttpClientModule } from '@angular/common/http';
import {HomeModule} from './home/home.module';
import { MatTableModule } from '@angular/material'; 
import { StorageServiceModule } from 'angular-webstorage-service';
import { ModalComponent } from './modal/modal.component';
import { LogoutComponent } from './logout/logout.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';



@NgModule({
  declarations: [
    AppComponent,HeaderComponent,FooterComponent,LoginComponent,ModalComponent, LogoutComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTabsModule, 
    MatToolbarModule,
    HttpClientModule,
    HomeModule,
    MatTableModule,
    StorageServiceModule,
    Ng4LoadingSpinnerModule.forRoot(),

    
  ],
  entryComponents: [ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
