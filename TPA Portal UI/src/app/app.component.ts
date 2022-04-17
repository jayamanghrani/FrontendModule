import { Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {LogoutService} from './service/logout.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LogoutComponent} from './logout/logout.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TPAPortalUI';
 
  constructor(public UserService : UserService, public logoutService:LogoutService ,
    private router : Router,public dialog: MatDialog ){
  }
  ngOnInit(){}



  public logout()
  {
     this.openDialog("Do you want to Logout ?");   
   }

  openDialog(response:string): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '270px',
      height: '140px',
      data: {response: response} 
    })
  };



}


// ngOnInit(){


//   // history.pushState(null, null, location.href);
//   // window.onpopstate = function () {
//   //     history.go(1);
//   // };

//   // this.firstname=sessionStorage.getItem('firstname');
//   // this.userFlag=false;
//   //   this.setUserDetail(); 
// }