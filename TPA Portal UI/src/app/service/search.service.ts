import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {SearchFileResponse} from '../util/interface/response/SearchFileResponse';
import {SearchFolderResponse} from '../util/interface/response/searchFolderResponse';
import {DownloadFileResponse} from '../util/interface/response/DownloadFileresponse'
import { claimSearchFolderUrl, claimSearchFileUrl,downloadURL} from '../util/constants';
import {HttpResponse} from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import {saveAs} from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  foldernameList:string[];
  request: any;
  downloadRequest:any;

  constructor(private httpclient: HttpClient,private router: Router) { } 

  searchFolderList():Promise<SearchFolderResponse>
  {
          const httpheader = {
            headers: new HttpHeaders({
           'userid':  sessionStorage.getItem('UserId'),
           'applicationid': sessionStorage.getItem('applicationid'),
           'X-Auth-Token': sessionStorage.getItem('token')       
           })
           } ;

      let formData = new FormData();
      
      return new Promise((resolve,reject) => 
      {
      console.log("Executing in promise");
      this.httpclient.post<SearchFolderResponse>(claimSearchFolderUrl,formData,httpheader)  
      .pipe(
        catchError(this.handleRequestError)
          )
      .subscribe(
          (response:SearchFolderResponse)=>
          {
           
            console.log(response.foldernameList) ;
            resolve(response);
          },
          (error:any)=>{
           reject(error);
          }  
        )

    });
  }


downloadFile(filename,foldername)
{
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
   headers = headers.set('X-Auth-Token',sessionStorage.getItem('token'));
   headers= headers.set('userid',sessionStorage.getItem('UserId'));
   headers= headers.set('applicationid',sessionStorage.getItem('applicationid')) 

   this.downloadRequest = {"filename": filename,"foldername": foldername}
   
   console.log(this.downloadRequest);

   this.httpclient.post(downloadURL,this.downloadRequest ,{responseType: 'Blob' as 'json',headers:headers}).    
   subscribe(data  => { 
     console.log("Receive response"+data);              
     saveAs(data,filename);    
   },  
   error  =>{ 
        alert("Error while downloading the file.");  
        console.error(error) ;   
      
      })  
   
} 
 


  searchUploadedFiles(selectedFolder): Promise<SearchFileResponse> {
    console.log("searching in folder"+selectedFolder);

    const httpheader = {
      headers: new HttpHeaders({
     'userid':  sessionStorage.getItem('UserId'),
     'applicationid': sessionStorage.getItem('applicationid'),
     'X-Auth-Token': sessionStorage.getItem('token')       
     })
     } ;

    let formData = new FormData();
    formData.append('foldername',selectedFolder);

    return new Promise((resolve, reject) => {
      console.log("Executing in promise");

      this.httpclient.post<SearchFileResponse>(claimSearchFileUrl,formData,httpheader)
      .pipe(
        catchError(this.handleRequestError)
      )
      .subscribe(
          (response:SearchFileResponse)=>{
            console.log(response);
            resolve(response);
          },
          (error:any)=>{
            console.error(error);
            reject(error);
          }
          
        )

    });
  }


  private handleRequestError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      console.error(error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error("Service returned code ${error.status}, body was: ${error.error}");
    }
    // return an observable with a user-facing error message
    return throwError("Something went wrong; please try again later.");
  }




}