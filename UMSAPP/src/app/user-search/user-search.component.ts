import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { UserSearchServiceService } from '../UmsServices/user-search-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { RoleServiceService } from '../UmsServices/role-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';


export interface DialogData {

}


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css', '../assets/css/emp2.css']
})

export class UserSearchComponent implements OnInit , AfterViewInit, OnDestroy{


  UserDetail_DATA: UserDetailsData[];
  displayedColumns = ['userId', 'branchId', 'firstName', 'applicationRole', 'permissionList', 'supervisorID', 'email', 'phoneNo', 'unlockUser'];
 
  sort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  dataSource = new MatTableDataSource<UserDetailsData>();
  public unlockUserId : any = -1;
  public confirmUnlock: boolean = false;
  data: any;
  restItems: any;
  public show: boolean = false;
  public show2: boolean = false;
  userid: any;
  branchid: any;
  firstname: any;
  lastname: any;
  supervisorid: any;
  roles: Array<String> = [];
  showAppData: any;
  unlockStatus: any[];
  showPermissionData: any;
  appNames: Set<String> = new Set<string>();
  exceldata: any;
  statusMsg: any;
  openRoleDialog; boolean;
  roleData: any;
  roleUpdateResponse: any;
  appSelect: any;
  roleSelect: any;
  allApplicationList: Map<string, string> = new Map<string, string>();
  showNullFieldError: boolean;
  errorMessage: any;
  appDataPresent: boolean;
  downloadButtonFlag:boolean;
  sub : Array<Subscription> =[];

  constructor(private UserSearch: UserSearchServiceService, public dialog: MatDialog,
    private RoleService: RoleServiceService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.showNullFieldError = false;
    this.appDataPresent = false;
    this.show = false;
    this.downloadButtonFlag=false;
    //this.downloadButtonValue='Export To Excel';
  }


  ngOnInit() {
    this.setRoleApplication();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   //this.paginator.pageIndex=0;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  clearNullFieldError() {
    this.showNullFieldError = false;
    this.errorMessage = "";
  }

  closeErrorDiv() {
    this.showNullFieldError = false;
    this.errorMessage = "";
  }

  setUserDeatilsUi(): void {
     this.paginator.firstPage();
     this.downloadButtonFlag=false;
    this.show = false;
    this.UserDetail_DATA = null;
    this.showNullFieldError = false;
    this.spinnerService.show();
    if (this.userid == null && this.branchid == null && this.firstname == null && this.lastname == null && this.supervisorid == null && this.appSelect == null && this.roleSelect == null) {
      this.showNullFieldError = true;
      this.errorMessage = "* Please fill a field to search";
      this.spinnerService.hide();
    }
    else {
      if(this.branchid != null && this.branchid.length>0){
        if(this.data.nonPrivilageRoleList == null ){
          this.searchForUserDetails();
        }else {
          if(this.branchid.length <2){
            this.showNullFieldError = true;
            this.errorMessage = "* Please fill atleast two digits for branch ID";
            this.spinnerService.hide();
          }else{
            this.searchForUserDetails();
          }
        }
      }else{
        this.searchForUserDetails();
      }
      
  }
}

  searchForUserDetails():void{
    this.sub.push(this.UserSearch.setUserDeatilsUi(this.userid, this.branchid, this.firstname, this.lastname,
      this.supervisorid, this.appSelect, this.roleSelect)
      .subscribe(restItems => {
        this.restItems = restItems;
        if (this.restItems.errorMessage != null) {
          this.showNullFieldError = true;
          this.errorMessage = this.restItems.errorMessage;
        }

        else {
          if (this.restItems.list != null) {
            if (this.restItems.list.length > 0) {
              this.UserDetail_DATA = this.restItems.list;
              this.dataSource = new MatTableDataSource<UserDetailsData>(this.UserDetail_DATA);
              this.show = true;
              this.ngAfterViewInit();
            } else {
              this.showNullFieldError = true;
              this.errorMessage = "* No Data Found";
            }
          }
          else {
            this.showNullFieldError = true;
            this.errorMessage = "* No Data Found";
          }
        }
        this.spinnerService.hide();
      })

      );
  }

  downloadExcelFile() {
    this.downloadButtonFlag=true;
    this.spinnerService.show();
    console.log(this.restItems.list);
    let userList = [];
    this.restItems.list.forEach(element => {
      userList.push(element.userId);
    });

    console.log(userList);
    var excelReqData = { "userId": userList };
    var row = {};
    this.restItems.list.forEach(element => {
      row = {
        userId: element.userId
      };
    });

  this.data.sub2=  this.UserSearch.getRolesForAllUsers(excelReqData).subscribe(
      data => {
        this.exceldata = data;
        console.log(this.exceldata.statusList);
        if (this.exceldata.statusList != null) {
            this.UserSearch.exportAsExcelFile(this.exceldata.statusList, 'export_');
        }
        else {
          this.showNullFieldError = true;
          this.errorMessage = "* System Error. Please contact to system Administrator.";

        }
        this.spinnerService.hide();
      }
    );
  }

  onlyAlphabets(e:any) {

    if (e.keyCode == 8 || e.keyCode == 46
        || e.keyCode == 37 || e.keyCode == 39) {
        return true;
      }
    if (e.keyCode !=9 && e.keyCode != 8 && e.keyCode !=37 && e.keyCode !=39 && e.keyCode !=46) {
      var regex = new RegExp("^[a-zA-Z]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
      }
        e.preventDefault();
        return false;
      
      
  }

  onlyNumberKey(evt:any) {
    if (evt.keyCode == 8 || evt.keyCode == 46
        || evt.keyCode == 37 || evt.keyCode == 39) {
        return true;
      }
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;
    } else {
      return true;
    }

  }

  resetValues(): void {
    this.userid = null;
    this.branchid = null;
    this.firstname = null;
    this.lastname = null;
    this.supervisorid = null;
    this.show = false;
    this.appSelect = null;
    this.roleSelect = null;
    this.showNullFieldError = false;
    this.downloadButtonFlag=false;
    this.roles = [];
  }

  setRoleApplication(): void {
    this.spinnerService.show();
    this.sub.push(this.UserSearch.setRoleApplication().subscribe(
      data => {
        this.data = data;
        this.appDataPresent = true;
        for (let app in this.data.applicationList) {
          this.allApplicationList.set(this.data.applicationList[app], app);
        }
        console.log(this.data);
        this.spinnerService.hide();
      }));

  }

  selectApp(event: any) {
    this.roles = [];
    console.log(this.data.roleList);
    this.allApplicationList.forEach((key: string, value: string) => {
      if (value == event.target.value)
        this.roles = this.data.roleList[key];
    });

    console.log(this.roles);

  }

  unlockConfirm(userid: any): void {
    console.log("User ID : " + userid);
    this.confirmUnlock = true;
    this.unlockUserId = userid;
  }

  cancelConfirm():void{
    this.unlockUserId = -1;
    this.confirmUnlock = false;
  }

  unlockUser(): void {
    console.log("Unlocking user");
    this.spinnerService.show();
    this.confirmUnlock = false;
    this.sub.push(this.UserSearch.unlockUser(this.unlockUserId)
      .subscribe(
        unlockStatus => {
          this.unlockStatus = unlockStatus;
          console.log(this.unlockStatus);
          this.unlockUserId = -1;
          this.spinnerService.hide();
          this.openUnlockMsg();
        }
      ));
  }

  showAppSearch(userId): void {
    this.spinnerService.show();

    this.sub.push(this.UserSearch.showAppSearch(userId,null)
      .subscribe(
        showAppData => {
          this.showAppData = showAppData;
          this.spinnerService.hide();

          this.openAppRoleList();

        }));
  }

  showPermissionList(userId): void {
    this.spinnerService.show();

    this.sub.push(this.UserSearch.showPermissionList(userId)
      .subscribe(

        showPermissionData => {
          this.showPermissionData = showPermissionData;
          this.spinnerService.hide();
          this.openPermissionList();
        }));
  }



  openAppRoleList() {
    let appDialog = this.dialog.open(ApplicationAndRoleDialog, {
      data: this.showAppData,
      disableClose: true
    });
    appDialog.afterClosed().subscribe(value => {
      if (value != null)
        console.log(value);
    });
  }


  openUnlockMsg() {
    let unlockDialog = this.dialog.open(UnlockUserDialog, {
      data: this.unlockStatus,
      disableClose: true
    });

    unlockDialog.afterClosed().subscribe(value => {
      if (value != null)
        console.log(value);
    });


  }


  openPermissionList() {
    let permissionDialog = this.dialog.open(PermissionListDialog, {
      data: this.showPermissionData.userpermission, disableClose: true

    });
    permissionDialog.afterClosed().subscribe(value => {
      if (value != null)
        console.log(value);
    });

  }


  roleshow(userId, branchId): void {
    this.spinnerService.show();
    this.sub.push(this.RoleService.roleshowservice(userId, branchId)
      .subscribe(
        roleData => {
          this.roleData = roleData;
          this.openRoleDialog = true;
          this.openRoleDialogFinal();
          console.log(this.roleData);
        }

      ));
  }


  openRoleDialogFinal(): void {

    let roleDialogNest = this.dialog.open(RoleUpdateRequestDialog, {
      data: this.roleData,
      disableClose: true,
      panelClass: 'role-permission-dialog',


    });
    roleDialogNest.afterClosed().subscribe(value => {
      if (value != null) {
        this.roleUpdateResponse = value;
        this.openRoleResponseDialog();
      }

    });
  }

  openRoleResponseDialog(): void {
    let roleResponseDialog = this.dialog.open(RoleUpdateResponseDialog, {
      data: this.roleUpdateResponse,
      disableClose: true,
    });
    roleResponseDialog.afterClosed().subscribe(value => {
      if (value != null)
        console.log(value);
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
  selector: 'app-role-dialog',
  templateUrl: 'app-role-dialog.html',

})
export class ApplicationAndRoleDialog {
  
  rolesList: Map<string , string> = new Map<string , string>();

  rolesPresent : Boolean ; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public appDialog: MatDialogRef<ApplicationAndRoleDialog>) {
    this.rolesPresent = false ;
  }

  selectAppName(selectedAppName){
    this.rolesList.clear();
    for(let roles in this.data.appAndRoleAccessDetails[selectedAppName]){
      if(! this.rolesList.has(this.data.appAndRoleAccessDetails[selectedAppName][roles].roleName)){
        this.rolesList.set(this.data.appAndRoleAccessDetails[selectedAppName][roles].roleName, this.data.appAndRoleAccessDetails[selectedAppName][roles].status);
      }
    }
      console.log(this.rolesList);
      if(this.rolesList.size > 0){
        this.rolesPresent=true;
      }else{
        this.rolesPresent=false;
      }
    }

  onCloseCancel(){
     this.appDialog.close();
  }

}



@Component({
  selector: 'unlock-dialog',
  templateUrl: 'unlock-dialog.html'

})
export class UnlockUserDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public unlockDialog: MatDialogRef<UnlockUserDialog>) { }

  onCloseCancel() {
    this.unlockDialog.close();
  }




}

@Component({
  selector: 'permission-dialog',
  templateUrl: 'permission-dialog.html',

})
export class PermissionListDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public permissionDialog: MatDialogRef<PermissionListDialog>) { }

  onCloseCancel() {
    this.permissionDialog.close();
  }

}




@Component({
  selector: 'roleDialogNest-dialog',
  templateUrl: 'roleDialogNest-dialog.html',

})
export class RoleUpdateRequestDialog {

  // showRoleUpdateComponent: Boolean;

  userRoleDataInDialog: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roleDialogNest: MatDialogRef<RoleUpdateRequestDialog>) {
    this.userRoleDataInDialog = data;
    // this.showRoleUpdateComponent = false;
  }

  showRequestId(roleResponse: any) {
    this.roleDialogNest.close(roleResponse);
  }

  cancelRoleUpdtaeDialog() {
    this.roleDialogNest.close();
  }
}



@Component({
  selector: 'roleUpdateResponse-dialog',
  templateUrl: 'roleUpdateResponse-dialog.html',

})
export class RoleUpdateResponseDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private UserSearchService: UserSearchServiceService,
    public roleResponseDialog: MatDialogRef<RoleUpdateResponseDialog>) {
  }

  ngOnInit() {
    this.UserSearchService.callOSBServiceForRoleUpdate().subscribe(data => {
      console.log(data);
    });
  }

  submitRoleUpdtaeResponseDialog() {
    this.roleResponseDialog.close();
  }
}



export interface UserDetailsData {
  userId: number;
  branchId: number;
  email: string;
  firstName: string;
  lastName: string;
  supervisorID: string;
  phoneNo: string;
}

