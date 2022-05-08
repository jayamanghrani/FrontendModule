import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { requestTrackUrl , appRoleRequestTrackUrl,requestDataXLSURL} from '../assets/constants'
import {RequestTrackComponent} from '../request-track/request-track.component'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class RequestTrackServiceService {
  
  headerOptions : any;
  requestTrackrequest : any;
  request : any;
  appRoleRequest : any;

  private  requestId;
	private  requestBy;
	private  userId;
	private  requestStatus;
	private  application;
	private  requestDateFrom;
	private  requestDateTo;
  
  
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';



  constructor(private http : HttpClient) {
    console.log("Service request track started.")
   }

   setRequestTrackDetail(requestId,requestBy,userId,requestStatus,application,requestDateFrom,requestDateTo)
   {     console.log("executing setRequestTrackDetail");
         this.requestId = requestId;
         this.requestBy = requestBy;
         this.userId = userId;
         this.requestStatus =  requestStatus;
         this.application = application;
         this.requestDateFrom = requestDateFrom;
         this.requestDateTo = requestDateTo;


         this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});

         this.requestTrackrequest = {"requestId": this.requestId, "requestBy": this.requestBy, "userId": this.userId,
         "requestStatus": this.requestStatus, "application": this.application, "requestDateFrom": this.requestDateFrom,
         "requestDateTo": this.requestDateTo}


         this.request = this.requestTrackrequest;

         console.log(this.request);

         return this.http
         .post<any[]>(requestTrackUrl,this.request,{headers : this.headerOptions})
         .pipe(map(data =>data));

   }


      
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json);
        var sheetData = [];
        var row = {};
        json.forEach(user => {
          user.forEach(element => {
            row = {
              application : element.application,
              role: element.role,
              action: element.action,
              remark: element.remark,
              status: element.status,
              provisionDate: element.provisionDate,
              branchId: element.branchId,
              requestBy: element.requestBy,
              requestDate: element.requestDate,
              requestId: element.requestId,
              requestReason: element.requestReason,
              userId : element.userId
          },
          
            sheetData.push(row);
          });
        });
      
        
    
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData);
        console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }
    
      private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: this.EXCEL_TYPE
        });
        saveAs(data, fileName + new Date().getTime() + this.EXCEL_EXTENSION);
      }
    
      ///New code for retrieving excel data containing role details for users
      
      getRolesForAllUsers(userdata: any) {
    
        this.headerOptions = new HttpHeaders({ 'Content-Type': 'application/json;'});
    
        return this.http.post(requestDataXLSURL, userdata, { headers: this.headerOptions })
          .pipe(resp => resp);
      }

   setRequestAppRoleDetails(requestId,userId,requestStatus){
    console.log("executing setRequestAppRoleDetails");
       this.requestId = requestId;
       this.userId = userId;

       this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});

      this.appRoleRequest = {"requestId": this.requestId,"userId": this.userId,"status" : requestStatus}

      this.request = this.appRoleRequest;
      console.log(this.request);

      return this.http
      .post<any[]>(appRoleRequestTrackUrl,this.request,{headers : this.headerOptions})
      .pipe(map(data =>data));

   }






   //Error Handler
  //  handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
   
  //     console.error(error); // log to console instead
   
  //     return of(result as T);
  //   };
  // }
  



  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }



 }
