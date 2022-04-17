import { Injectable } from '@angular/core';
 import { loginURL } from 'src/app/util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import  { LoginResponse} from '../../app/util/interface/response/LoginResponse';
import { handleRequestError } from './error-handler';
import{LoginDetail} from '../util/interface/model/LoginDetail';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private  HttpClient:  HttpClient) { }

   Login(logindetail: LoginDetail): Promise<LoginResponse> 
  {
    var data = new FormData();
    data.append("userName", logindetail.username);
    data.append("password", logindetail.password);

  return new Promise((resolve, reject) => 
    {
      console.log("Executing in promise");

      this.HttpClient.post<LoginResponse>(loginURL, data )
      .pipe(
        catchError(handleRequestError)
          )
          .subscribe(
               (LoginResponse: LoginResponse) => 
                {
                console.log("response--"+LoginResponse);
                console.log("loggedIn--"+LoginResponse.loggedIn);
                console.log("Status-Code"+LoginResponse.statusCode);
                resolve(LoginResponse);
               },  
              (error: any) => 
              {
              console.error(error);
               reject(error);
              }  
          );

    });
  }

  public getUserLoggedInStatus = (): boolean => {
    let response:LoginResponse
    if(response.loggedIn==='true')   
     return true;

     else
     return false;
    }



}
