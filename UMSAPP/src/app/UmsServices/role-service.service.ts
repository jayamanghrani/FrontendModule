import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userSearchUrl ,roleUpdateUrl, allPermissionSearchURL , getAllOfficeCodes } from '../assets/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  userId: any;
  branchId : string;
  headerOptions: any;
  request: any;
  //roleData: any[];
  public show:boolean = false;
  //LoadAppData: any;
  roleUpdateRequest : any;
  permissionList: {"requestBy":any ,"userId": any , "branchId": any , "reason": any, "userRoles":any , "permissionName":any, "pLId": any}
  showAllPermissionRequest : { "userID": any;  "plID":any,  "plName":any,  "branchId":any};
  roleSearchRequest : { "userId": any; };

  constructor(private http : HttpClient, private router: Router) { }

    roleshowservice(userId , branchId){
    this.userId = userId;
    this.branchId=branchId;
  
    this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
    
    this.roleSearchRequest = {"userId": this.userId}
    
    this.request = this.roleSearchRequest;
    console.log(this.request);
    return this.http
    .post<any[]>(userSearchUrl,this.request,{headers : this.headerOptions})
    .pipe(map(data =>data));
     

  }  

  showAllPermissionList(userId){
    this.headerOptions = new HttpHeaders({'Content-Type':'application/json;' } );
    this.showAllPermissionRequest = {
                                      "userID": userId,  "plID":"", "plName":"", "branchId":""
                                    }
    this.request = this.showAllPermissionRequest;
    console.log(this.request);
  
  
    return this.http
    .post<any[]>(allPermissionSearchURL,this.request,{headers : this.headerOptions})
    .pipe(map(data =>data));
  }

  getAllOfficeCodeDetails(){
    this.headerOptions = new HttpHeaders({'Content-Type':'application/json;' } );
    this.request = {};
    return this.http.post<any[]>(getAllOfficeCodes , this.request, {headers : this.headerOptions})
    .pipe(map((data) =>data));
  }

  sendRoleUpdateRequest(requestBy, userId, branchId, newUserRoles, reason , permissionName , pLId, removedIIMSBranches){

    this.headerOptions = new HttpHeaders({'Content-Type':'application/json;'});
    this.roleUpdateRequest = {
                                "requestBy":requestBy ,"userId": userId , "branchId": branchId , "reason": reason,
                                "userRoles":newUserRoles , "permissionName":permissionName, "pLId": pLId, "removedBranches":removedIIMSBranches
                             }

    this.request =  this.roleUpdateRequest;
    console.log(this.request);
    
    return this.http.post<any[]>(roleUpdateUrl , this.request,{headers : this.headerOptions})
    .pipe(map(data=>data));
  }


}
