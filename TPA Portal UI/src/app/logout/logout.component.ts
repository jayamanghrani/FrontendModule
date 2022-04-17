import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LogoutService} from '../service/logout.service';
import { Router } from '@angular/router';

interface DialogData {
  response: string;

}


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  message:boolean
  xhr: XMLHttpRequest;

  constructor(public dialogRef: MatDialogRef<LogoutComponent>, public logoutService:LogoutService,
     private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    
  ngOnInit() {
  }

    onNOClick(): void {
      this.dialogRef.close();
    }

    onYESClick():void{
      this.dialogRef.close();
      this.xhr = this.logoutService.logout();
    
      this.xhr.onreadystatechange = () =>
      {
        if(this.xhr.readyState == 4)
         {
                if(this.xhr.status == 200)
                {
                  var resp= this.xhr.responseText;
                  resp=resp.trim();
                  console.log("response"+resp);
                  console.log("index-"+resp.indexOf("successfully"))
                      if(resp.indexOf("successfully")!=-1)
                      {             
                        console.log("Success");
                        sessionStorage.clear();
                        this.router.navigateByUrl( '/' ); 
                      }
                }            
                else 
                  {
                    alert("Session Expired. Please Login again!!");
                    sessionStorage.clear();
                    this.router.navigateByUrl( '/' );
                  }
          }  
          }   
        }
      }