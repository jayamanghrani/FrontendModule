import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { CurrentUserDetail } from '../util/interface/model/CurrentUserDetail';
import {LoginResponse} from '../util/interface/response/LoginResponse';
import { isNullOrUndefined } from 'util';
import{LoginDetail} from '../util/interface/model/LoginDetail';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public LoginForm: FormGroup;
  public LoginDetail:LoginDetail;
  cntrlActive : boolean;
  public result:string;


  constructor(private loginService: LoginService ,private router : Router,
    private spinnerService: Ng4LoadingSpinnerService) { }

   ngOnInit() {
    this.LoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)    
  });
}

login()
{ 
this.spinnerService.show();

  if (this.LoginForm.valid)
   {
     console.log("Login form valid");   
    this.username=this.LoginForm.get('username').value
    this.password=this.LoginForm.get('password').value
     this.LoginDetail =
      {
      username: this.username,
      password: this.password
      };
 

  this.loginService.Login(this.LoginDetail)
        .then((response: LoginResponse) => {
          //response.statusCode==0
            if(response.loggedIn==='true' && response.token!=null)
            {
             console.log("response "+response.userId+"  "+response.firstName+" "+response.uploadType);
                sessionStorage.setItem('UserId',response.userId); 
                sessionStorage.setItem('firstname',response.firstName); 
                sessionStorage.setItem('lastname',response.lastName);  
                sessionStorage.setItem('token',response.token);
                sessionStorage.setItem('UploadType',response.uploadType);
                sessionStorage.setItem('loggedIn',response.loggedIn);
                sessionStorage.setItem('applicationid',response.applicationId); 
                sessionStorage.setItem('uploadFlag',response.uploadFlag);  
                console.log("Application Id from Login response-"+response.applicationId)
                this.spinnerService.hide();
                this.router.navigateByUrl('/homeupload');   

            }
            else{
             console.log(response.statusMessage);
             alert( response.statusMessage);
             this.spinnerService.hide();
              alert( response.statusMessage);  
              this.router.navigateByUrl( '/' ); 

            }
     
         
        }).catch((error: any) => {
          console.error("error------"+error);
          alert("Some Error Occured. Please try later!!")
          this.spinnerService.hide();
        
          
        });
}
}


// Validation
keyUpHandler(event: KeyboardEvent) {
  if (event.keyCode == 17 || event.keyCode == 16) {
    this.cntrlActive = false;
  }
}

// Username Validation

keyDownHandler(event: KeyboardEvent){
  //Start of shift+insert prevent
      if (event.keyCode == 17 || event.keyCode == 16) {
        this.cntrlActive = true;
      }
  //End of shift+insert prevent

  if(event.key=="v"&&this.cntrlActive){
    console.log("Copy Paste Denied!");
    event.preventDefault();
    return;
  }
//Start of shift+insert prevent
if (event.keyCode == 45 && this.cntrlActive) {
console.log("Shift Insert Denied");
event.preventDefault();
return;
}
//End of shift+insert prevent
  if(event.keyCode == 13) {
    this.login();
    
  }
  var regex = new RegExp("^[a-zA-Z_0-9\_]+$");
  if (regex.test(event.key)) {
  }else{
    console.log("Invalid Key " + event.key + ". Keypress prevented.");
    event.preventDefault();
  }
}


// Password validation

keyDownHandlerPassword(event: KeyboardEvent) {
  if (event.keyCode == 17 || event.keyCode == 16) {
    this.cntrlActive = true;

  }

//End of shift+insert prevent

  if(event.key=="v"&&this.cntrlActive){
    console.log("Copy Paste Denied!");
    event.preventDefault();
    return;
  }
//Start of shift+insert prevent
if (event.keyCode==45 && this.cntrlActive) {
console.log("Shift Insert Denied");
event.preventDefault();
return;
}
//End of shift+insert prevent

  if((event.keyCode==32)||(event.keyCode==190)){
    console.log("Invalid Key " + event.key + ". Keypress prevented.");
    event.preventDefault();
  }
  if(event.keyCode == 13) {
   this.login();
    
  }
}
}