import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { roleUpdateXLSUrl } from '../assets/constants';
import { uploadExcelURL } from '../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelServiceService {
  request: any;
  constructor(private  httpClient:  HttpClient) { }

  getApplicationRoleList(url : string){
    console.log("reached inside service");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };

    return  this.httpClient.post(url,null,httpOptions);
  }

  uploadExcelFile(fileData : FormData){
    const httpOptions = {
      headers: new HttpHeaders({
       // 'Content-Type':  'multipart/form-data; boundary=12345'
       'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
      //  'userid':'34436'
      }) 
    };

    return this.httpClient
    .post<any[]>(uploadExcelURL,fileData,httpOptions)
    .pipe(map(data =>data));

  }


  updateRole(Exceldata) {
    console.log(Exceldata);
 
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type':'application/json;'}
      )
    };

    this.request = Exceldata;
  
    return  this.httpClient.post(roleUpdateXLSUrl,this.request,httpOptions);
 
 
   }

  //Error Handler
  // handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
   
  //     console.error(error); // log to console instead
   
  //     return of(result as T);
  //   };
  // }
  
}



