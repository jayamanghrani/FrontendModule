import { Component, OnInit , Inject, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { RoleServiceService } from '../UmsServices/role-service.service';
import { UserSearchServiceService } from '../UmsServices/user-search-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MAT_DIALOG_DATA, MatDialog , MatDialogRef, MatDatepickerInputEvent, MatPaginator, MatSort, MatTableDataSource, MatTabChangeEvent} from '@angular/material';
import { RoleUpdateRequestDialog } from '../user-search/user-search.component';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

export interface DialogData {
  
}


@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoleSelectorComponent implements OnInit, AfterViewInit , OnDestroy{
  

  UserRoleDetails_DATA : UserRoleDetails[];
  displayedColumns: string[]  = ['select', 'roleName', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<UserRoleDetails>();

  sort;
  @ViewChild('roleStartDate') startDateRef: ElementRef;
  @ViewChild('roleEndDate') endDateRef: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set content (content : ElementRef){
    this.sort=content;
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  } 
  @Output() requestRoleUpdtaeResponse = new EventEmitter<any>();
  
   /*holds finance roles based on branches as key */
  userFinanceRoleMap : Map<string, any> = new Map<string, any>();
  userFinanceRoleDetail :any;
  selectedBranchIndex: number;
  roleStartDates : any = {};
  roleEndDates : any = {};
  mainRoleStartDates : any = {};
  mainRoleEndDates : any = {};
  dropdownList :  Array<{'branchIds': string}>=[];
  tempDropdownList :  Array<{'branchIds': string}>=[];
  selectedItems : Array<string>;
  /* IIMS branch list multiple add removal variables*/
  tempSelectedIimsBranch : Set<string>=new Set<string>();
  initialIimsBranchList: Set<string>=new Set<string>();
  removedIimsBranchList : Set<string>=new Set<string>();
  removedBranchArray: Array<string>=[];
  combinedBranchList : Set<string>=new Set<string>();   /* To keep track of number of branches select in IIMS and finance*/
   /* holds existing other brnaches in for finance app for any user */
  userFinanceBranchList : Set<string>=new Set<string>();
  branchList : Set<string>=new Set<string>();
  dropdownSettings : any;
  currentDate: any = { start_Date: new Date() };
  defaultEndDate: any = { end_Date: new Date() };
  officeCodeList:any;
  branchIdForFinanceRole : string;
  officeCodes : Array<string>=[];
  selected : number;
  isLoading : boolean;
  show: boolean;
  userId : any;
  branchId : string;
  roleData : any;
  loadAppData : any;
  userDataSet : Map<string, any> = new Map<string, any>();
   /* holds all the info for any role -> generic type */
  userAllAppSet : Array<{"status":string,"appId" : any ,"appName":string, "roleId" :any, "roleName":string, "officeCode":any, "startDate":any, "endDate":any , "disable": any}>=[];
   /* stores all the application names */
  allApplicationNames : Array<any>=[];
   /* response containing all the roles of selected user*/
  userRoleDetail: any;
  allApplicationList: Map<string, string> = new Map<string, string>();  /*Application key and value */
  requestBy : any;
  allPermissionListDetails : any;
  showPermissionListDialog : boolean;
  permissionName : any;
  pLId: any;
  remark : any;
  roleResponse : any;
  showRemarkError: boolean;
  showSubmitButton : boolean;
   /* stores the active roles of selected user  */
  userExistingRole : Array<{ "appId" : string , "roleId" :number, "officeCode":any, "startDate":any, "endDate":any }> =[];
  /* stores ums roles list of loggedin user -> used for giving access to check uncheck any role*/
  loginUserUMSRoleList : Set<string> = new Set<string>();
   /* holds all the non privileged roles id's*/
  nonPrivilegeRoleList :  Set<number> = new Set<number>();
  isLoginUserHOUser: Boolean;
  remarkErrorValue : string;
  loginUserRoleDetail : any;
  dropDownFlag : boolean;
   /* stores all the observable items */
  sub : Array<Subscription> =[];

// Added for JIRA Role List

jiraRoleList :  Set<number> = new Set<number>();

// Added for JIRA Role List

  myplaceHolder: string ;

  constructor(private RoleServiceService: RoleServiceService, public dialog: MatDialog,
    private UserSearch: UserSearchServiceService, private spinnerService: Ng4LoadingSpinnerService, 
    private roleUpdateRequestDialog : RoleUpdateRequestDialog) {
    this.roleData = this.roleUpdateRequestDialog.userRoleDataInDialog;
    this.userId = this.RoleServiceService.userId;
    this.branchId = this.RoleServiceService.branchId;
    this.showPermissionListDialog = false;
    this.showRemarkError=false;
    this.showSubmitButton=false;
    this.show=false;
    this.isLoading=true;
    this.selected=0;
    this.branchIdForFinanceRole = this.branchId;
    this.isLoginUserHOUser=true;
    this.myplaceHolder='Search';
    this.selectedItems=[];
    this.dropDownFlag =false;
    this.selectedBranchIndex = 0;

    this.defaultEndDate.end_Date.setDate(this.defaultEndDate.end_Date.getDate()+1);
  }



  ngOnInit() {
     /* default setting for the IIMS multiselect dropdown*/
    this.dropdownSettings = {
      singleSelection: false,
      limitSelection:2,
      idField: 'branchIds',
      textField: 'branchIds',
      allowSearchFilter: true
    };
    
    this.setGeneralRoleAndApplication();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   /*load all the applications and roles from the cache service along with formatting data and setting application tab list */
  setGeneralRoleAndApplication():void {  
    this.spinnerService.show();
    this.sub.push(this.UserSearch.setRoleApplication()
      .subscribe(
        loadAppData => {
          this.loadAppData = loadAppData;
          for (let app in this.loadAppData.applicationList) {
            if(!this.allApplicationList.has(this.loadAppData.applicationList[app])){
              this.allApplicationList.set(this.loadAppData.applicationList[app], app);
            }
          }
          /* checks whether logged user is HO user or not and stores all the non privileged roles */
          if(this.loadAppData.nonPrivilageRoleList!=null){
            this.isLoginUserHOUser=false;
            for (let nonPrivilegeRole in this.loadAppData.nonPrivilageRoleList) {
              if(!this.nonPrivilegeRoleList.has(parseInt(nonPrivilegeRole))){
                this.nonPrivilegeRoleList.add(parseInt(nonPrivilegeRole));
              }
            }
          } 

// Added for JIRA Role List
          if(this.loadAppData.jiraRoleList!=null){
            this.isLoginUserHOUser=false;
            for (let jiraRole in this.loadAppData.jiraRoleList) {
              if(!this.jiraRoleList.has(parseInt(jiraRole))){
                this.jiraRoleList.add(parseInt(jiraRole));
              }
            }
            console.log(this.jiraRoleList);
          }

// Added for JIRA Role List

          this.allApplicationNames=Array.from(this.allApplicationList.values());
          /* sets PORTAL as the first application in tab */
          for(let i=0 ; i<this.allApplicationNames.length ; i++){
            if("Portal" == this.allApplicationNames[i]){
              this.allApplicationNames.splice(i,1);
              this.allApplicationNames.unshift("Portal");
            }
          }
          console.log(this.allApplicationNames);
          
          this.setUserApplicationAndRole();
        }
      ))
  }

/*gets all the active and pending roles of any user  */
  setUserApplicationAndRole():void {
   this.sub.push(this.UserSearch.showAppSearch(this.userId , null)
      .subscribe(
        userRoleDetail => {
          this.userRoleDetail = userRoleDetail;
          this.requestBy= this.userRoleDetail.header.employeeId;
          console.log(this.loadAppData);
          console.log(this.userRoleDetail);
          this.getLoginUserRoleDetails();
        }
      ))
  }

  /* gets the active and pending roels of logged in user*/
  getLoginUserRoleDetails():void{
    this.loginUserUMSRoleList.clear();
    this.sub.push(this.UserSearch.showAppSearch(this.requestBy , null)
      .subscribe(
        loginUserRoleDetail => {
          this.loginUserRoleDetail = loginUserRoleDetail;
          /* checks all the roles present in UMS app to give access according to it*/
          for(let roleIndex in this.loginUserRoleDetail.appAndRoleAccessDetails["UMS"]){
            if(this.loginUserRoleDetail.appAndRoleAccessDetails["UMS"][roleIndex].status ==="S"){
              if(!this.loginUserUMSRoleList.has(this.loginUserRoleDetail.appAndRoleAccessDetails["UMS"][roleIndex].roleName)){
                  this.loginUserUMSRoleList.add(this.loginUserRoleDetail.appAndRoleAccessDetails["UMS"][roleIndex].roleName);
              }
            }
          }
          
          console.log("Login user details: -----------");
          console.log("HO user : -----------" + this.isLoginUserHOUser);
          console.log(this.loginUserUMSRoleList);
          // let arrayLength = this.allApplicationNames.length;
          // for(let i=0;i<arrayLength;i++){
          //   if(!this.loginUserUMSRoleList.has[this.allApplicationNames[i]]){
          //     this.allApplicationNames.splice(i,1);
          //   }
          // }
          this.mapUserRolesWithGeneralRoles();
        }));
        
        
  }

 
  /*mapping all roles with user active and pending roles to display as in roles div... 
    Also checks for the priviledge roles and hide for non HO users */

  mapUserRolesWithGeneralRoles() :void {
    this.removedBranchArray=[];
    this.userExistingRole = [];
    this.selectedItems=[];
    console.log(this.nonPrivilegeRoleList);

    let iimsBranchCount=0;
    let financeBranchCount=0;

    /* first loop (runs for application) containing all the application and roles list from cache service*/
    for (let allApp in this.loadAppData.roleList) {
      /* variable for show or hide priviledge roles*/
      let disableRole= 'Y';
      if(allApp==="UMS"){
        for (let index in this.loginUserRoleDetail.appAndRoleAccessDetails["Portal"]) {
          if(this.loginUserRoleDetail.appAndRoleAccessDetails["Portal"][index].roleName ==="UMS" && this.loginUserRoleDetail.appAndRoleAccessDetails["Portal"][index].status==="S"){
            disableRole='N';
          }
        }
      }else{
        if(this.loginUserUMSRoleList.has(allApp)){
          disableRole="N";
        }
      }
            let checkAppStatus= false;
            this.userAllAppSet=[];
            let applicationID = this.getApplicationKeyFromValue(allApp);

            if(!this.userDataSet.has(applicationID)){
              /*second loop which checks whether application of first loop present in this loop or not...
                based on that it will go for checking roles */
              for (let userApp in this.userRoleDetail.appAndRoleAccessDetails) {
                if(userApp === allApp){
                  checkAppStatus=true;
                  /* third loop checking for all roles of any application*/
                for(let allRole in this.loadAppData.roleList[allApp]){
                  /* temp variable to check whether iterating role available in user role list or not */
                  let checkUserRoleStatus= false;
                  /* fourth loop checks whether that role is present in the user roles list or not */
                  for (let userApp2 in this.userRoleDetail.appAndRoleAccessDetails[userApp]) {
                   if(parseInt(this.loadAppData.roleList[allApp][allRole]) === parseInt(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId)){
                     
                      /* checks for all the branches present for IIMS application and stores the branch list*/
                      if((userApp === StaticKeys.iimsKey)&&(iimsBranchCount<3)&&(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode != null) && (this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode != this.branchId)){
                        if(!this.tempSelectedIimsBranch.has(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode)){
                            this.tempSelectedIimsBranch.add(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode);
                            iimsBranchCount++;
                        }
                      }
                     /*checks for all the branches present for Finance application and stores the branch list */
                      if(userApp === StaticKeys.financeName && financeBranchCount<3 && this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode != null && this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode != this.branchId){
                        if(!this.userFinanceBranchList.has(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode)){
                          this.userFinanceBranchList.add(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode);
                          financeBranchCount++;
                        }
                      }


                      /* stores start date and end date for all the roles*/
                      this.roleStartDates[this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId+this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode]=this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].startDate;
                      this.roleEndDates[this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId+this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode]=this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].endDate;
                     

                      if(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode === this.branchId){
                        checkUserRoleStatus = true;
                        /*check for HO user */
                        if(this.isLoginUserHOUser){
                          this.setUserAllAppSet(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].status, 
                            userApp, 
                            this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleName ,
                            applicationID,
                            this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId,
                            this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode,
                            this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].startDate,
                            this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].endDate,
                            disableRole
                            );
                        }else{
                          /* check for priviledge roles*/

                         

                          
                          let checkForPrivilageRole=this.nonPrivilegeRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                         // Added for JIRA Role List
                         let checkForJiraRole=this.jiraRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                         // Added for JIRA Role List

                          if(checkForPrivilageRole){
                            this.setUserAllAppSet(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].status, 
                              userApp, 
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleName ,
                              applicationID,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].startDate,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].endDate,
                              disableRole
                              );
                          }

                           // Added for JIRA Role List
                           if(checkForJiraRole){
                            this.setUserAllAppSet(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].status, 
                              userApp, 
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleName ,
                              applicationID,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].startDate,
                              this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].endDate,
                              disableRole
                              );
                          }
                          // Added for JIRA Role List
                        }
                      }

                      /* it stores all the roles of selected user which are in active status*/
                      if(this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].status === "S"){
                        this.addRolesToExistingList(applicationID,
                                                    this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].roleId,
                                                    this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].officeCode,
                                                    this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].startDate,
                                                    this.userRoleDetail.appAndRoleAccessDetails[userApp][userApp2].endDate
                                                    );
                      }
                      if(userApp !== StaticKeys.iimsKey && userApp !== StaticKeys.financeName){
                        break;
                      }
                      
                    }  
                  }
                  if(!checkUserRoleStatus){
                    /*if role is not present in the user list then null status is stored for those roles */
                    if(this.isLoginUserHOUser){
                      this.setUserAllAppSet(null,userApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null, disableRole);  
                    }else{
                       let checkForPrivilageRole=this.nonPrivilegeRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                     // Added for JIRA Role List
                     let checkForJiraRole=this.jiraRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                     // Added for JIRA Role List
                       if(checkForPrivilageRole){
                        this.setUserAllAppSet(null,userApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null, disableRole);  
                       }// Added for JIRA Role List
                       else if(checkForJiraRole){
                        this.setUserAllAppSet(null,userApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null, disableRole);  
                       }
                       // Added for JIRA Role List
                      //  else{
                         
                      //  }
                    }
                    
                }
              }
            }
          }
          /*check whether iterating application present in the list or not */
          if(checkAppStatus){
            this.userDataSet.set(applicationID , this.userAllAppSet);
          }else{
            this.userAllAppSet=[];
            for(let allRole in this.loadAppData.roleList[allApp]){
              if(this.isLoginUserHOUser){
                this.setUserAllAppSet(null,allApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null,disableRole);
              }else{
                 let checkForPrivilageRole=this.nonPrivilegeRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                  // Added for JIRA Role List
                  let checkForJiraRole=this.jiraRoleList.has(parseInt(this.loadAppData.roleList[allApp][allRole]));
                  // Added for JIRA Role List
                 if(checkForPrivilageRole){
                  this.setUserAllAppSet(null,allApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null,disableRole);
                 }
                 // Added for JIRA Role List
                 else if(checkForJiraRole){
                  this.setUserAllAppSet(null,allApp,allRole,applicationID,this.loadAppData.roleList[allApp][allRole],null,null,null,disableRole);
                 }
                 // Added for JIRA Role List
                //  else{
                   
                //  }
              }
            }
            /* this one stores all the roles with their application as key in a map -> which will get rendered in the roles column*/
            this.userDataSet.set(applicationID , this.userAllAppSet);
          }
        }
      }

          /* provides default checked values for the IIMS multiselect*/
          this.tempSelectedIimsBranch.forEach(element =>{
            this.selectedItems.push(element);
            if(!this.combinedBranchList.has(element)){
              this.combinedBranchList.add(element);
            }
          })
          
          /* temporary start and end date storage*/
          this.mainRoleStartDates=Object.assign({},this.roleStartDates);
          this.mainRoleEndDates=Object.assign({},this.roleEndDates);

          console.log(this.selectedItems);
          console.log(this.userExistingRole);
          console.log(this.userDataSet);
          console.log(this.userFinanceBranchList);
          //
          this.tempSelectedIimsBranch.forEach(data=>{
            this.initialIimsBranchList.add(data);
          });
          console.log("................................");
          console.log(this.initialIimsBranchList);
          /* finance map containg branches as key and all roles of finance as value */
          this.userFinanceBranchList.forEach(element=>{
            if(!this.userFinanceRoleMap.has(element)){
             this.selectFinanceForBranch(element);
            }
            if(!this.combinedBranchList.has(element)){
              this.combinedBranchList.add(element);
            }
          });

          if(!this.userFinanceRoleMap.has(this.branchId)){
            this.userFinanceRoleMap.set(this.branchId,this.getFormatedUserAppAndRoles(StaticKeys.financeKey));
          } 
          console.log(this.userFinanceRoleMap);
          this.spinnerService.hide();
          /* called to assign the default tab select when app loads */
          this.onDefaultTab(StaticKeys.oid , this.branchId);
          /* after loading if logged in user has access of iims in UMS then this method gets all the branch list and sets in the dropdown*/
          if(this.loginUserUMSRoleList.has(StaticKeys.iimsKey)|| this.loginUserUMSRoleList.has(StaticKeys.financeName)){
            this.setOfficeCodes();
          }
          /* it sets the branches for finance dropdown*/
          this.setOfficeCodesForFinance();
           this.spinnerService.hide();

  }


  /* generic method for formatting all the roles */
  setUserAllAppSet(status, appName,roleName,appId,roleId,officeCode,startDate,endDate,disableRole):void{
    this.userAllAppSet.push({ 'status': status, 
                              'appName': appName, 
                              'roleName': roleName, 
                              'appId': appId , 
                              'roleId': parseInt(roleId),
                              'officeCode':officeCode,
                              "startDate":startDate,
                              "endDate":endDate,
                              "disable":disableRole
                            });
  }
  /* generic method for getting application id from application name*/
  getApplicationKeyFromValue(checkValue:string):string{
    let appKey=null;
    this.allApplicationList.forEach((value: string, key:string)=>{
      if(value == checkValue)
        appKey= key;
    });
    return appKey;
  }

  /* generic method for getting all the roles present for any application */
  getFormatedUserAppAndRoles(checkAppId:string):Array<any>{
    let allRoleDetails:Array<any>=[];
    this.userDataSet.forEach((value :any , key: any)=>{
      if(key == checkAppId){
        allRoleDetails = value;
      }
    })
    return allRoleDetails;
  }

  /* generic method for getting all finance roles for any branch selected */
  getFinanceRolesAccToBranchId(branchId:string):Array<any>{
    console.log(this.userFinanceRoleMap);
    let allRoleDetails:Array<any>=[];
    this.userFinanceRoleMap.forEach((value :any , key: any)=>{
      if(key === branchId){
        allRoleDetails = value;
      }
    })
    return allRoleDetails;
  }

  /*method gets called when someone changes the application tab */
  onTabClick(event: MatTabChangeEvent) :void{
    this.spinnerService.show();
    this.isLoading=true;
    this.selectedBranchIndex = 0;
    this.branchIdForFinanceRole = this.branchId;
    
    this.dataSource.data=[];
    let appNameDisplay= event.tab.textLabel;
    
    for(let i=0 ; i<this.allApplicationNames.length ; i++){
      if(appNameDisplay == this.allApplicationNames[i])
        this.selected=i; 
    }
    appNameDisplay = this.getApplicationKeyFromValue(appNameDisplay);

    
    if(appNameDisplay === StaticKeys.financeKey){
      // this.selectBranchId();
      //this.selectFinanceForBranch(this.branchId);
      if(!this.userFinanceRoleMap.has(this.branchId)){
        this.selectFinanceForBranch(this.branchId);
      }else{
        this.onDefaultTab(StaticKeys.financeKey, this.branchId);
      }
    }
    else
      this.onDefaultTab(appNameDisplay , this.branchId);
  }

  onDefaultTab(tabSelectName , branch):void{
    console.log("App name : --------------  "  + tabSelectName);
    console.log("App name : --------------  "  + branch);
    this.dataSource=null;
    if(tabSelectName === StaticKeys.financeKey){
      this.UserRoleDetails_DATA = this.getFinanceRolesAccToBranchId(branch); 
    }else{
      this.UserRoleDetails_DATA = this.getFormatedUserAppAndRoles(tabSelectName); 
    }

    this.dataSource = new MatTableDataSource<UserRoleDetails>(this.UserRoleDetails_DATA);
    
    this.show=true;
    this.ngAfterViewInit(); 
    this.isLoading=false;
    this.spinnerService.hide();
  }


    /* method gets executed when any branch ID tab is removed from the finance application list  */
  removeTab(removeBranch :any, redirect :boolean) {
    console.log(removeBranch);
    
    let reomveTab =true;
    let tempArray = this.getFinanceRolesAccToBranchId(removeBranch);

    tempArray.forEach((element:any)=>{
      if(element.status!=null){
        reomveTab=false;
      }
    })

    if(reomveTab){
      let index;
      let action = false;
      //if(this.selectedItems.indexOf(removeBranch)<0){
        if(this.combinedBranchList.has(removeBranch)){
          this.combinedBranchList.delete(removeBranch);
        }
        
        for(let i=this.officeCodes.length-1;i>=0 ; i--){
          if(this.officeCodes[i]==removeBranch){
            index=i;
            action=true;
          }
        }

        if(action){
          this.officeCodes.splice(index,1);
        }
        this.branchIdForFinanceRole =this.branchId;
        this.selectedBranchIndex =0;
        if(redirect){
          this.onDefaultTab(StaticKeys.financeKey, this.branchId);
        }
        
        if(this.dropDownFlag){
          this.dropdownList =this.tempDropdownList;
        }
      //}
    }
    

  }

 

/*method called when any branch ID is selected from the dropdown list of the finac=nce application */
  selectFinanceForBranch(branch: string):void{
    this.isLoading=true;
    
    console.log(branch);
    this.dataSource.data=[];
    var tempFinanceRoles : Array<any>=[];
    this.branchIdForFinanceRole =  branch;

      tempFinanceRoles = JSON.parse(JSON.stringify(this.getFormatedUserAppAndRoles(StaticKeys.financeKey)));
      let roleLength= tempFinanceRoles.length;
      this.sub.push(this.UserSearch.showAppSearch(this.userId , branch)
      .subscribe(
        userFinanceRoleDetail => {
          this.userFinanceRoleDetail = userFinanceRoleDetail;
          console.log(this.userFinanceRoleDetail);

          if(JSON.stringify(this.userFinanceRoleDetail.appAndRoleAccessDetails) !== '{}'){
            for(let i=0;i<roleLength;i++){
              let roleCheckFlag=false;
                for(let userRole in this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName]){
                if(tempFinanceRoles[i].roleId === parseInt(this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName][userRole].roleId)){
                  tempFinanceRoles[i].status=this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName][userRole].status;
                  tempFinanceRoles[i].startDate=this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName][userRole].startDate;
                  tempFinanceRoles[i].endDate=this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName][userRole].endDate;
                  tempFinanceRoles[i].officeCode=this.userFinanceRoleDetail.appAndRoleAccessDetails[StaticKeys.financeName][userRole].officeCode;
                  roleCheckFlag=true;
                  break;
                }
              }
              if(!roleCheckFlag){
                  tempFinanceRoles[i].status=null;
                  tempFinanceRoles[i].startDate=null;
                  tempFinanceRoles[i].endDate=null;
                  tempFinanceRoles[i].officeCode=null; 
              }
            }
          }
          else{
            for(let i=0;i<roleLength;i++){
              tempFinanceRoles[i].status=null;
              tempFinanceRoles[i].startDate=null;
              tempFinanceRoles[i].endDate=null;
              tempFinanceRoles[i].officeCode=null; 
            }
          }

            this.userFinanceRoleMap.set(branch, tempFinanceRoles);
            tempFinanceRoles=[];
          
          this.onDefaultTab(StaticKeys.financeKey, branch);
            
        }));
  }

  /* called when someone changes the branch tab in finance*/
  selectBranchIdTab(branchId:any , index : number) :void{
  console.log(branchId +"   " + index);
  this.selectedBranchIndex = index;

    this.branchIdForFinanceRole=branchId;
    if(!this.userFinanceRoleMap.has(branchId)){
      this.selectFinanceForBranch(branchId);
    }else{
      this.onDefaultTab(StaticKeys.financeKey, branchId);
    }
  }

  /* */
  selectBranchId():void{
    
    console.log("event");
    console.log(this.branchIdForFinanceRole);

    if(!this.userFinanceBranchList.has(this.branchIdForFinanceRole)){
      this.userFinanceBranchList.add(this.branchIdForFinanceRole);
    }
    
    if(!this.combinedBranchList.has(this.branchIdForFinanceRole)){
      this.combinedBranchList.add(this.branchIdForFinanceRole);
    }

    if(this.officeCodes.indexOf(this.branchIdForFinanceRole)<0){
      this.officeCodes.push(this.branchIdForFinanceRole);
    }

    console.log(this.officeCodes);
    console.log(this.userFinanceBranchList);

    if(this.combinedBranchList.size===2){
      this.dropDownFlag=true;
      this.dropdownList=[];
      let tempArray = [];
      this.combinedBranchList.forEach(element=>{
        tempArray.push({'branchIds': element});
      })
      this.dropdownList=tempArray;
    }

    // if(!this.userFinanceRoleMap.has(this.branchIdForFinanceRole)){
    //   this.selectedBranchIndex = this.selectedBranchIndex+1;
    //   this.selectFinanceForBranch(this.branchIdForFinanceRole);
    // }

    this.branchIdForFinanceRole =this.branchId;

  }

  /* called when any one changes the roles status for any applicaiton*/
  onRoleCheckboxSelect(event:any):void{
    this.spinnerService.show();
    let action = false;
    let temp = JSON.parse(event.target.value);
    console.log(temp);
    var tempAppId = temp.appId;
    var tempRoleId = temp.roleId;
    var tempValueStorage : Array<any>=[];

    var startDateField = null;
    var endDateField=null;
    let index;

    if(event.target.type == "checkbox"){
      if(event.target.checked){
        if(!event.target.disabled){
          if(this.roleStartDates[tempRoleId+this.branchIdForFinanceRole]==null){
             this.roleStartDates[tempRoleId+this.branchIdForFinanceRole]=this.getFormatedDate(this.currentDate.start_Date); 
          }
          startDateField=this.getFormatedDate(this.roleStartDates[tempRoleId+this.branchIdForFinanceRole]);

          if(this.roleEndDates[tempRoleId+this.branchIdForFinanceRole]!=null){
            endDateField=this.getFormatedDate(this.roleEndDates[tempRoleId+this.branchIdForFinanceRole]);
          }

          for(let i=0; i< this.userExistingRole.length ; i++){
            if((tempAppId != StaticKeys.financeKey)&&(this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)){
              action = true;
            }
          }
          if(action == false){
             if(tempAppId === StaticKeys.iimsKey){
              console.log(this.tempSelectedIimsBranch);
              this.tempSelectedIimsBranch.forEach(element => {
                this.addRolesToExistingList(tempAppId,tempRoleId,element,startDateField,endDateField);
              });
              this.addRolesToExistingList(tempAppId,tempRoleId,this.branchId,startDateField,endDateField);
            }
            else if(tempAppId === StaticKeys.financeKey){
              console.log("Finance apps  ---  " + this.branchIdForFinanceRole);
              let addRole = true;
              for(let i=0; i< this.userExistingRole.length ; i++){
                if((this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)&&(this.userExistingRole[i].officeCode === this.branchIdForFinanceRole)){
                 addRole=false; 
                }
              } 
              if(addRole){
                this.addRolesToExistingList(tempAppId,tempRoleId,this.branchIdForFinanceRole,startDateField,endDateField);
              }
            }
            else{
              this.addRolesToExistingList(tempAppId,tempRoleId,this.branchId,startDateField,endDateField);
            }
          }
          if(tempAppId === StaticKeys.financeKey){
            tempValueStorage =  this.getFinanceRolesAccToBranchId(this.branchIdForFinanceRole);
          }else{
            tempValueStorage = this.getFormatedUserAppAndRoles(tempAppId);
          }
          for(let i=0;i<tempValueStorage.length;i++){
            if((tempValueStorage[i].appId == tempAppId)&&(tempValueStorage[i].roleId == tempRoleId)){
              tempValueStorage[i].status="N";
              tempValueStorage[i].startDate=startDateField;

              if(tempAppId === StaticKeys.financeKey){ 
                tempValueStorage[i].officeCode=this.branchIdForFinanceRole;
              }else{ 
                tempValueStorage[i].officeCode=this.branchId;
              }
            }
          }

          // console.log(tempValueStorage);         
        }
      }
      
      else{
        if(!event.target.disabled){
          for(let i=0; i< this.userExistingRole.length ; i++){
            if((this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)){
              if(tempAppId === StaticKeys.financeKey){
                if(this.userExistingRole[i].officeCode==this.branchIdForFinanceRole){
                  action = true;
                  index=i;
                }
              }
              else{
                action = true;
                index=i;
              }
            }
          }
          if(action){
           if(index >= 0){ 

             if(tempAppId === StaticKeys.financeKey){
              for(let i=0; i< this.userExistingRole.length ; i++){
                if((this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)&&(this.userExistingRole[i].officeCode==this.branchIdForFinanceRole)){
                  this.removeRolesToExistingList(i);
                }
              }
            }
            else if(tempAppId === StaticKeys.iimsKey){
              //for(let j=0; j<= this.selectedItems.length;j++){
                this.tempSelectedIimsBranch.forEach(element => {
                  // console.log(element);
                
                for(let i=0; i< this.userExistingRole.length ; i++){
                  if((this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)&&(this.userExistingRole[i].officeCode==element)){
                    this.removeRolesToExistingList(i);
                  }
                }
              });

              for(let i=0; i< this.userExistingRole.length ; i++){
                if((this.userExistingRole[i].appId == tempAppId)&&(this.userExistingRole[i].roleId == tempRoleId)&&(this.userExistingRole[i].officeCode==this.branchId)){
                  this.removeRolesToExistingList(i);
                }
              }

            }
             else{
              this.removeRolesToExistingList(index);
             }  
           }
          }
   
          if(tempAppId === StaticKeys.financeKey){
            tempValueStorage =  this.getFinanceRolesAccToBranchId(this.branchIdForFinanceRole);
          }else{
            tempValueStorage = this.getFormatedUserAppAndRoles(tempAppId);
          }
          for(let i=0;i<tempValueStorage.length;i++){
            if((tempValueStorage[i].appId == tempAppId)&&(tempValueStorage[i].roleId == tempRoleId)){      
                tempValueStorage[i].status=null;
                tempValueStorage[i].officeCode=null;
                tempValueStorage[i].startDate=null;
                tempValueStorage[i].endDate=null;
            }
          }
          this.roleEndDates[tempRoleId+this.branchIdForFinanceRole]=this.mainRoleEndDates[tempRoleId+this.branchIdForFinanceRole];
          this.roleStartDates[tempRoleId+this.branchIdForFinanceRole]=this.mainRoleStartDates[tempRoleId+this.branchIdForFinanceRole];
        }
      }
    }
    
    console.log(this.userExistingRole);
    this.spinnerService.hide();
  }

  addRolesToExistingList(appId, roleId, offcode,startDate,endDate):void{
    this.userExistingRole.push({"appId":appId,
                                "roleId":parseInt(roleId),
                                "officeCode":offcode,
                                "startDate":startDate,
                                "endDate":endDate
                              });
  }

  removeRolesToExistingList(index):void{
    this.userExistingRole.splice(index,1);
  }

  getFormatedDate(dateValue):string{
    var dateObj = new Date(dateValue);
    var momentObj = moment(dateObj);
    return momentObj.format('YYYY-MM-DD');
  }

  setStartDate(event: MatDatepickerInputEvent<Date>, element:any){
    var tempValueStorage : Array<any>=[];
    console.log(event.value);
    console.log(element);
    var startDate = this.getFormatedDate(event.value);
    // var someDate = new Date(startDate);
    // console.log(this.defaultEndDate.end_Date);
    this.defaultEndDate.end_Date.setDate((new Date(startDate)).getDate() + 1);
    this.roleEndDates[element.roleId+this.branchIdForFinanceRole]=null;
    // console.log(this.defaultEndDate.end_Date);
    // console.log(startDate);
    this.roleStartDates[element.roleId+this.branchIdForFinanceRole]=startDate;
    for(let i=0; i< this.userExistingRole.length ; i++){
      if((this.userExistingRole[i].appId == element.appId)&&(this.userExistingRole[i].roleId == element.roleId)){
        if((element.appId == StaticKeys.financeKey)){
          if(this.userExistingRole[i].officeCode == this.branchIdForFinanceRole){
            this.userExistingRole[i].startDate=startDate;
            this.userExistingRole[i].endDate=null;
          }
        }else{
          this.userExistingRole[i].startDate=startDate;
          this.userExistingRole[i].endDate=null;
        }
      }
    }
    console.log(this.userExistingRole);
    if(element.appId === StaticKeys.financeKey){
      tempValueStorage =  this.getFinanceRolesAccToBranchId(this.branchIdForFinanceRole);
    }else{
      tempValueStorage = this.getFormatedUserAppAndRoles(element.appId);
    }
    for(let i=0;i<tempValueStorage.length;i++){
      if((tempValueStorage[i].appId == element.appId)&&(tempValueStorage[i].roleId == element.roleId)&&(tempValueStorage[i].status=="S")){      
        tempValueStorage[i].startDate=startDate;
      }
    }
    console.log(this.userDataSet);
    // console.log(this.roleStartDates);
  }

  
  setEndDate(event: MatDatepickerInputEvent<Date>, element:any):void{
    var tempValueStorage : Array<any>=[];
    var endDate= this.getFormatedDate(event.value);
    console.log(endDate);
    // console.log(element);
    this.roleEndDates[element.roleId+this.branchIdForFinanceRole]=endDate;
    for(let i=0; i< this.userExistingRole.length ; i++){
      if((this.userExistingRole[i].appId == element.appId)&&(this.userExistingRole[i].roleId == element.roleId)){
        if((element.appId == StaticKeys.financeKey)){
          if(this.userExistingRole[i].officeCode == this.branchIdForFinanceRole){
            this.userExistingRole[i].endDate=endDate;
          }
        }else{  
          this.userExistingRole[i].endDate=endDate;
        }
      }
    }
    console.log(this.userExistingRole);
    if(element.appId === StaticKeys.financeKey){
      tempValueStorage =  this.getFinanceRolesAccToBranchId(this.branchIdForFinanceRole);
    }else{
      tempValueStorage = this.getFormatedUserAppAndRoles(element.appId);
    }
    for(let i=0;i<tempValueStorage.length;i++){
      if((tempValueStorage[i].appId == element.appId)&&(tempValueStorage[i].roleId == element.roleId)&&(tempValueStorage[i].status=="S")){      
        tempValueStorage[i].endDate=endDate;
      }
    }
    console.log(this.userDataSet);
    // console.log(this.roleEndDates);
    // console.log(this.roleStartDates);
  }


  myStyle(): object {
    return {'color':'#000000db'};
  }
 
  checkPlaceHolder() {
     if (this.myplaceHolder) {
       this.myplaceHolder = null
       return;
     } else {
       this.myplaceHolder = 'Search'
       return
     }
   }

  onItemSelect(event:any) {
    for(let i=0; i< this.userExistingRole.length ; i++){
      if(this.userExistingRole[i].officeCode == this.branchId && this.userExistingRole[i].appId===StaticKeys.iimsKey){
        this.addRolesToExistingList(this.userExistingRole[i].appId, this.userExistingRole[i].roleId, event, this.userExistingRole[i].startDate, this.userExistingRole[i].endDate);
      }
    }

    if(!this.combinedBranchList.has(event)){
      this.combinedBranchList.add(event);
    }
    console.log(this.userExistingRole);
    if(!this.tempSelectedIimsBranch.has(event)){
      this.tempSelectedIimsBranch.add(event);
    }

    if(this.officeCodes.indexOf(event)<0){
      this.officeCodes.push(event);
    }


      if(this.initialIimsBranchList.has(event)){
        if(this.removedIimsBranchList.has(event)){
          this.removedIimsBranchList.delete(event);
        }
      }
    
      console.log(this.removedIimsBranchList);
    console.log(this.tempSelectedIimsBranch);
}

  onItemDeselect(event:any) {
    let length =this.userExistingRole.length;
    for(let i=length-1; i>=0 ; i--){
      if(typeof this.userExistingRole[i] != 'undefined'){
      if(this.userExistingRole[i].officeCode == event && this.userExistingRole[i].appId===StaticKeys.iimsKey){
         this.removeRolesToExistingList(i);
      }
    }
    }
    this.removeTab(event,false);

    if(this.tempSelectedIimsBranch.has(event)){
      this.tempSelectedIimsBranch.delete(event);
    }


      if(this.initialIimsBranchList.has(event)){
        if(!this.removedIimsBranchList.has(event)){
          this.removedIimsBranchList.add(event);
        }
      }
    
    console.log(this.removedIimsBranchList);
    console.log(this.tempSelectedIimsBranch);

    console.log(this.userExistingRole);
  }

 setOfficeCodes():void{

  this.sub.push(  this.RoleServiceService.getAllOfficeCodeDetails().subscribe(
      (data) => {
        this.officeCodeList=data;
        console.log(this.officeCodeList);
        if(this.officeCodeList.officeCodes != null){
          let branchLength=this.officeCodeList.officeCodes.length;
          for(let i=0; i<branchLength;i++){
            if(this.officeCodeList.officeCodes[i]!=this.branchId){
              if(!this.branchList.has(this.officeCodeList.officeCodes[i])){
                this.branchList.add(this.officeCodeList.officeCodes[i]);
              }
              const branchObj = {'branchIds': this.officeCodeList.officeCodes[i]};
              this.tempDropdownList.push(branchObj);
            }
          }
          if(this.combinedBranchList.size===2){
            this.dropDownFlag=true;
            let tempArray = [];
            this.combinedBranchList.forEach(element=>{
              tempArray.push({'branchIds': element});
            })
            this.dropdownList=tempArray;
            
          }else{
            this.dropdownList=this.tempDropdownList;
          }
        }
      }));
  }


  setOfficeCodesForFinance():void{
    console.log("Branch   : " )
    console.log(this.tempSelectedIimsBranch);
    if(this.officeCodes.indexOf(this.branchId)<0){
      this.officeCodes.push(this.branchId);
    }

    this.tempSelectedIimsBranch.forEach(element => {
        if(this.officeCodes.indexOf(element)<0){
          this.officeCodes.push(element);
        }
    });

    this.userFinanceBranchList.forEach(element => {
      if(this.officeCodes.indexOf(element)<0){
        this.officeCodes.push(element);
      }
  });
  }


  
  checkRemarkValue(e:any){
    if (e.keyCode !=9 && e.keyCode != 8 && e.keyCode !=37 && e.keyCode !=39 && e.keyCode !=46) {
      var regex = new RegExp("^[a-zA-Z0-9_. ]+( [a-zA-Z0-9_. ]+)*$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        this.showSubmitButton=true;
        return true;
      }
      e.preventDefault();
      return false;
      } 
    }
    
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


  roleUpdateSubmit(){
    if((this.remark == null) ||(this.remark.trim() == "") || (this.remark.length==0)){
      this.remarkErrorValue = "Remark is madatory";
      this.showRemarkError=true;
      return false;
      
    }
    else{
      var regex = new RegExp("^[a-zA-Z0-9_. ]+( [a-zA-Z0-9_. ]+)*$");

       if(regex.test(this.remark)){
          console.log(this.userExistingRole);
          this.spinnerService.show();


          this.removedIimsBranchList.forEach(data=>{
            this.removedBranchArray.push(data);
          });

          this.sub.push(this.RoleServiceService.sendRoleUpdateRequest(this.requestBy, this.userId, this.branchId, 
                                                        this.userExistingRole, this.remark, this.permissionName , this.pLId, this.removedBranchArray)
          .subscribe(
              roleResponse => {
              this.roleResponse = roleResponse;
              console.log(this.roleResponse);
              this.requestRoleUpdtaeResponse.emit(this.roleResponse);
              this.spinnerService.hide();
            }
          ));
       }else{
          this.remarkErrorValue = "No special charaters allowed";
           this.showRemarkError=true;
           return false;
       }
    }
   }






  getPermissionListDetails(){
    console.log("Inside permission list details");
    this.allPermissionListDetails=[];
    this.spinnerService.show();
    this.sub.push(this.RoleServiceService.showAllPermissionList(this.userId)
        .subscribe(

          allPermissionListDetails => {
            this.allPermissionListDetails = allPermissionListDetails;
            this.showPermissionListDialog = true;
            this.spinnerService.hide();
            this.openPermissionListDialog();
       }));

      }

  openPermissionListDialog(){
    this.permissionName="";
    let permissionListDialogRef = this.dialog.open(PermissionListInRoleDialog, {
    data : this.allPermissionListDetails,
    panelClass: 'role-permission-dialog',
    disableClose: true
     
   }); 


   permissionListDialogRef.afterClosed().subscribe(value => {
    if(value != null){
      this.permissionName = value.permissionName; 
      this.pLId = value.pLId;
      console.log(value); 
    }
    console.log("Check permission List value >> : " +this.permissionName);
   });
  
  }

  ngOnDestroy(){
    this.sub.forEach((element:Subscription)=>{
      if(element != null){
        element.unsubscribe();
      }
    }) 
  }

}


@Component({
  selector: 'app-permissionList-dialog',
  templateUrl: 'app-permissionList-dialog.html',

})
export class PermissionListInRoleDialog {

permissionListToShow : Array<string>;
dataShow : any;
showList : boolean;
search : any;
permissionId : any;
pLId : any;
permissionName : any;
permission: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,  
      public permissionListDialogRef: MatDialogRef<PermissionListInRoleDialog>
      ) {
        this.dataShow=data;
        this.showList=false;
  }

  searchPermissionList(){
      this.permissionListToShow =[];

    if((this.search != null) && (this.search != "")){
      for(let abc in this.dataShow.details){
        if((new RegExp(this.search, 'i')).test(this.dataShow.details[abc].plID)){
          this.permissionListToShow.push(this.dataShow.details[abc]);
        }
      }
    }

    if(this.permissionListToShow.length > 0)
       this.showList=true;

    if((this.search == null) || (this.search == "") || (this.permissionListToShow.length == 0))
       this.showList=false;

   }
   onSelectChange(plID){

   this.permissionId = plID

   }
  submitPermisssionList(){

        for(let abc in this.dataShow.details){
          if(this.permissionId === this.dataShow.details[abc].plID){
            this.pLId= this.dataShow.details[abc].plID;
            this.permissionName = this.dataShow.details[abc].plName;
          }
        }

        this.permission={"pLId" : this.pLId , "permissionName" : this.permissionName};
        this.permissionListDialogRef.close(this.permission);
  }

  cancelPermisssionList(){
    console.log("Inside cancel request");
    this.permissionListDialogRef.close();
  }

}


export interface UserRoleDetails{
  roleName: string;
  appName : string;
  roleId : any;
  appId : any;
  status :string;
  officeCode: any;
  disable:any;
}

export class StaticKeys {
  public static financeKey="FINANCIALS";
  public static iimsKey="IIMS";
  public static financeName = "Finance";
  public static oid="OID";
}