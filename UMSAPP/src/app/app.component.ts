import { Component, OnInit } from '@angular/core';
import {UserSearchServiceService} from './UmsServices/user-search-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserIdleService } from 'angular-user-idle';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./assets/css/emp2.css']
})
export class AppComponent implements OnInit{
  title = 'UMSAPP';
  userLoggedInDetails : any;
  userDetailPresent: boolean;

  constructor(private userIdle: UserIdleService,private UserSearch: UserSearchServiceService, 
    private http : HttpClient, public router: Router, public spinnerService : Ng4LoadingSpinnerService,
    location: PlatformLocation) {
    this.userDetailPresent = false;
    //  this.showLoggedInUserDetails();

  

}


ngOnInit() { 

  console.log("Init function");
  this.showLoggedInUserDetails();
  console.log(" init of user looged in");


  this.userIdle.startWatching();
    
  // Start watching when user idle is starting.
  this.userIdle.onTimerStart().subscribe(count => console.log(count));
  
  // Start watch when time is up.
  this.userIdle.onTimeout().subscribe(() =>   this.router.navigate(['/logout']));
}

showLoggedInUserDetails(){
  this.spinnerService.show();
  this.UserSearch.getLoggedInUserDetail().subscribe(
    data => {      
      this.userLoggedInDetails = data;
      if(this.userLoggedInDetails.userId != null){
        this.userDetailPresent=true;
      }
      
      console.log(this.userLoggedInDetails);
      this.spinnerService.hide();
    }
    );
}

  logout(){
    window.close();
  }


  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }

  }

