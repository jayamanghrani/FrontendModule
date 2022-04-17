import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';

export const handleRequestError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      console.error(error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error("Service returned code :"+error.status);
      console.error("Body : " + error.error);
    }
    // return an observable with a user-facing error message
    return throwError("Something went wrong; please try again later.");
  }