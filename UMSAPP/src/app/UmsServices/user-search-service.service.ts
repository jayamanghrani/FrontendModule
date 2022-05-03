import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userSearchUrl,userLoggedInDetailURL, roleApplicationSearchUrl,showAppSearchURL, unlockUser, userPermissionSearchURL, userXLSData, osbUpdateUserRolesURL} from '../assets/constants'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})



export class UserSearchServiceService {
  headerOptions : any;
  request: any;
  userSearchRequest:any;
  showAppSearchRequest:any;
  unlockRequest: { "userId": any; };
  showPermissionRequest: { "userId": any; };
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(private http : HttpClient) {
  }


getuserSearch(){

}


public exportAsExcelFile(json: any[], excelFileName: string): void {
  console.log(json);
      var sheetData = [];
      var row = {};
      json.forEach(user => {
        user.forEach(element => {
          row = {
            User_ID: element.userId,
            User_Name: element.firstName + " " + element.lastName,
            Branch_Id: element.branchId,
            Application_Name: element.applicationName,
            Role_Name: element.roleName
          };
          sheetData.push(row);
        });
      });
      
  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: this.EXCEL_TYPE
      });
      saveAs(data, fileName + new Date().getTime() + this.EXCEL_EXTENSION);
    }
  

    getRolesForAllUsers(userdata: any) {
  
      this.headerOptions = new HttpHeaders({ 'Content-Type': 'application/json;'});
  
      return this.http.post(userXLSData, userdata, { headers: this.headerOptions })
        .pipe(resp => resp);
    }

setUserDeatilsUi(userId, branchId, firstName, lastName, supervisorId, appSelect, roleSelect){
  this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
  
  this.userSearchRequest = {"userId": userId,"branchId": branchId,"firstName": firstName,
  "lastName": lastName,"supervisorId": supervisorId, "applicationId" : appSelect , "roleId": roleSelect}
  
  this.request = this.userSearchRequest;
  console.log(this.request);
  return this.http
  .post<any[]>(userSearchUrl,this.request,{headers : this.headerOptions})
  .pipe(map(data =>data));
 
}


setRoleApplication(){

  this.headerOptions = new HttpHeaders({'Content-Type':'application/json'})

   return this.http
   .post<any[]>(roleApplicationSearchUrl,{headers : this.headerOptions})
   .pipe(map(data =>data));
}


callOSBServiceForRoleUpdate(){
  this.headerOptions = new HttpHeaders({'Content-Type':'application/json'});
  return this.http
  .post<any[]>(osbUpdateUserRolesURL,{},{headers : this.headerOptions})
  .pipe(map(data =>data));
}

unlockUser(userId){
  this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
  this.unlockRequest = {"userId": userId}
  this.request = this.unlockRequest;
  console.log(this.request);

  return this.http 
  .post<any[]>(unlockUser,this.request,{headers : this.headerOptions})
  .pipe(map(data =>data));
}


showAppSearch(userId , branchId){
  this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
  this.showAppSearchRequest = {"userId": userId , "branchId" : branchId}
  this.request = this.showAppSearchRequest;
  console.log(this.request);
  return this.http
  .post<any[]>(showAppSearchURL,this.request,{headers : this.headerOptions})
  .pipe(map(data =>data));
}


showPermissionList(userId){
  this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
  this.showPermissionRequest = {"userId": userId}
  this.request = this.showPermissionRequest;
  console.log(this.request);
  return this.http
  .post<any[]>(userPermissionSearchURL,this.request,{headers : this.headerOptions})
  .pipe(map(data =>data));

}







getLoggedInUserDetail(){
  this.headerOptions=new HttpHeaders({'Content-Type':'application/json;'});
  return this.http
  .post<any[]>(userLoggedInDetailURL,{headers : this.headerOptions})
  .pipe(map(data =>data));
}


}

class Mapper{
  constructor(data){
    var applicationList = data;
    console.log(applicationList)
  }
}
