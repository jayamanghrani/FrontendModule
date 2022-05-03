import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,   HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { MatDialog , MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material';
import { Component , Inject} from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Injectable } from '@angular/core';
import { osbURLToMatch } from './assets/constants';
   
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(public dialog: MatDialog, public loaderService: Ng4LoadingSpinnerService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
      return next.handle(request)
        .pipe(
          // retry(1),
       

          catchError((error: HttpErrorResponse) => {
            let errorMessage = {};
            // if (error.error instanceof ErrorEvent) {
            //   errorMessage = {ErrorCode:  "Client Error", Message: error.error.message};
            // } else {
              console.log(error.url);
              console.log(error);
              if (!(error.error instanceof ErrorEvent)) {
                if(!((error.url).includes(osbURLToMatch))){
                //   console.log("Yipee");
                // }else{
                  errorMessage = {ErrorCode:  error.status , Message: "System Error. Please contact System Administrator."};
                  let errorPageDialog = this.dialog.open( ErrorPageDialog, {
                    data : errorMessage,
                    disableClose: true
                    
                  }); 
    
                  errorPageDialog.afterClosed().subscribe(value => {
                    if(value != null)
                    console.log(value);
                  });
                }
                  
              }
            console.log(errorMessage);

            // let errorPageDialog = this.dialog.open( ErrorPageDialog, {
            //     data : errorMessage,
            //     disableClose: true
                 
            //    }); 

            //    errorPageDialog.afterClosed().subscribe(value => {
            //     if(value != null)
            //     console.log(value);
            //    });
            
            return throwError(errorMessage);
            
          })
        )
    }

   }


   @Component({
    selector: 'app-errorPage-dialog',
    templateUrl: 'errorPage-dialog.html',
  
  })
  export class ErrorPageDialog {
    errorData : any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,  
    public errorPageDialog: MatDialogRef<ErrorPageDialog>) {
        console.log("Inside Error Constructor  : ");
        console.log(data);
        this.errorData= data;
    }

    cancelErrorPage(){
        console.log("Inside cancel request");
        this.errorPageDialog.close();
      }
  }

  export interface DialogData { 
}
