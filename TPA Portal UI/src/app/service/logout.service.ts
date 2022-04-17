import { Injectable } from '@angular/core';
import { LogoutURL} from 'src/app/util/constants';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  xhr: XMLHttpRequest;

constructor(){}

logout()  
{
  console.log("logout service call");
  this.xhr = new XMLHttpRequest();
  console.log("logout clicked");
  this.xhr.open("POST", LogoutURL,true);
  this.xhr.setRequestHeader("X-Auth-Token", sessionStorage.getItem('token'));  
  this.xhr.setRequestHeader("applicationid", sessionStorage.getItem('applicationId'));
  this.xhr.setRequestHeader("userid", sessionStorage.getItem('UserId'));
  this.xhr.send();
  return this.xhr;

}
}
