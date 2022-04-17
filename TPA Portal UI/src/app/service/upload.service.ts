import { Injectable } from '@angular/core';
import { UploadFileUrl,claimSearchFolderUrl,UploadFileUrlTXT } from 'src/app/util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UploadFileDocument } from '../../app/util/interface/model/upload-file-document';
import  { FileUploadResponse} from '../../app/util/interface/response/FileUploadResponse';
import { handleRequestError } from './error-handler';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private  HttpClient:  HttpClient) { }

  uploadFileDocument(uploadFileData: UploadFileDocument): Promise<FileUploadResponse>
  { 

    const httpheader = {
      headers: new HttpHeaders({       
        'userid':  sessionStorage.getItem('UserId'),
        'firstname': sessionStorage.getItem('firstname'),
        'lastname' : sessionStorage.getItem('lastname'),
        'X-Auth-Token': sessionStorage.getItem('token'),
        'uploadType':  sessionStorage.getItem('UploadType'), 
        'applicationid': sessionStorage.getItem('applicationid'),
        'Content-type' : 'application/json'
         
      })
    };

    const httpFormheader = {
      headers: new HttpHeaders({       
        'userid':  sessionStorage.getItem('UserId'),
        'firstname': sessionStorage.getItem('firstname'),
        'lastname' : sessionStorage.getItem('lastname'),
        'X-Auth-Token': sessionStorage.getItem('token'),
        'uploadType':  sessionStorage.getItem('UploadType'), 
        'applicationid': sessionStorage.getItem('applicationid')
         
      })
    };

   //console.log("upload type-"+sessionStorage.getItem('UploadType'))
console.log("upload type"+ uploadFileData.claimUploadType)

    let extension: string = uploadFileData.filename.slice(uploadFileData.filename.lastIndexOf(".") + 1);
    let formData = new FormData();
    formData.append('filename',uploadFileData.filename);
    formData.append('claimUploadType',uploadFileData.claimUploadType)

    if(extension!=="xml"){
    formData.append('file', uploadFileData.file, uploadFileData.file.name);
  }else{
    formData.append('filedata', uploadFileData.filedata);
  }

if(extension!=="xml")
   {
    return new Promise((resolve, reject) => {
      console.log("Executing in promise");
      this.HttpClient.post<FileUploadResponse>(UploadFileUrl, formData,httpFormheader).
      pipe( 
        catchError(handleRequestError) 
      ).
      subscribe(
        (response: FileUploadResponse) => {
          console.log("response message--"+response.message);
          console.log("response status-"+response.status);
          resolve(response);
        },
        (error: any) => {
          console.error(error);
          reject(error);
        }
      );

    });
  }else{
     return new Promise((resolve, reject) => {
      this.HttpClient.post<FileUploadResponse>(UploadFileUrlTXT, {"filename":uploadFileData.filename,"filedata":uploadFileData.filedata,"claimUploadType":uploadFileData.claimUploadType},httpheader).
      pipe( 
        catchError(handleRequestError) 
      ).
      subscribe(
        (response: FileUploadResponse) => {
          console.log("response message--"+response.message);
          console.log("response status-"+response.status);
          resolve(response);
        },
        (error: any) => {
          console.error(error);
          reject(error);
        }
      );

    });
  }
  }



  searchDocument(): Promise<FileUploadResponse>
  { 

    const httpheader = {
      headers: new HttpHeaders({
        'userid':  sessionStorage.getItem('UserId'),
        'firstname': sessionStorage.getItem('firstname'),
        'lastname' : sessionStorage.getItem('lastname'),
        'X-Auth-Token': sessionStorage.getItem('token'),
        'uploadType':  sessionStorage.getItem('UploadType'),
        'applicationid': sessionStorage.getItem('applicationid')
      })
    };

    return new Promise((resolve, reject) => {
      console.log("Executing in promise");
      this.HttpClient.post<FileUploadResponse>(claimSearchFolderUrl,httpheader).
      pipe( 
        catchError(handleRequestError) 
      ).
      subscribe(
        (response: FileUploadResponse) => {
          console.log("response message--"+response.message);
          console.log("response status-"+response.status);
          resolve(response);
        },
        (error: any) => {
          console.error(error);
          reject(error);
        }
      );

    });
  }
}