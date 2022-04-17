import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  xhr: XMLHttpRequest;

  constructor() { }

  service()  
{
  console.log(" service call");
  this.xhr = new XMLHttpRequest();
  this.xhr.open("GET", "http://localhost:8080/Service/",true);
  this.xhr.send();
  return this.xhr;

}
}



