import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userFlag:boolean;
  uploadFlag:boolean;
  firstname:string;

  constructor(private http: HttpClient) {}

   getName():string
   {
      this.firstname=sessionStorage.getItem('firstname');
      return this.firstname;
    }
     
 getFlag():boolean
 {
   this.uploadFlag=false;
  if(sessionStorage.getItem('uploadFlag')==='Y')
  {
    this.uploadFlag=true;
    return this.uploadFlag;
  }
  return this.uploadFlag;
 
 }

  getUserStatus():boolean{
  // console.log("Getting user details...");
  this.userFlag=false;
  let win = (window as any);
  var str1 = new String(win.location); 
  var index = str1.indexOf( "home" ); 
  // console.log("indexOf found String :" + index );
  if(index >-1 && sessionStorage.getItem('loggedIn')==='true')  
  {
   
   this.userFlag = true; 
   return this.userFlag;
  }
  // console.log( this.userFlag);
  return this.userFlag;
 


}
}