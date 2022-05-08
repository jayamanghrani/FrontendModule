import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {RequestTrackServiceService} from '../UmsServices/request-track-service.service'
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {UserSearchServiceService} from '../UmsServices/user-search-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';

export interface DialogData { 
}

const moment =  _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-request-track',
  templateUrl: './request-track.component.html',
  styleUrls: ['./request-track.component.css','../assets/css/emp2.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RequestTrackComponent implements OnInit, AfterViewInit, OnDestroy{

  RequestTrace_DATA : RequestTraceDetails[];
  displayedColumns = ['requestId', 'userId', 'branchId', 'requestBy', 'requestDate', 'requestReason', 'requestedDetails'];
  dataSource = new MatTableDataSource<RequestTraceDetails>();
  sort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set content (content : ElementRef){
    this.sort=content;
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  } 

  minDate : Date;
  maxDate : Date;
  requestId : any;
  requestBy: any;
  userId: any;
  requestStatus: any;
  requestTrackItems : any;
  requestAppRoleItems : any;
  public show:boolean = false;
  showapp: any;
  pid: any;
  data: any;
  requestDateFrom : any;
  requestDateTo : any;
  applicationRole: Array<String> = [];
  exceldata: any;
  showNullTraceError: any;
  appSelect : any;
  appDataPresent : boolean;
  errorMessage : any;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  

  @ViewChild("requestDateFromID", {read: ElementRef}) reqDateFrom: ElementRef;
  @ViewChild("requestDateToID", {read: ElementRef}) reqDateTo: ElementRef;

  constructor(private RequestTrack: RequestTrackServiceService, public dialog: MatDialog, 
              private UserSearch: UserSearchServiceService,
              private spinnerService: Ng4LoadingSpinnerService ) { 
    console.log("inside RequestTrack contructure");
    this.showNullTraceError=false;
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date();
    this.appDataPresent=false;
    this.requestStatus=null;
    
  }

  ngOnInit() {
    this.setRoleApplication();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.paginator.pageIndex=0;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'requestDate': return new Date(item.requestDate);
        default: return item[property];
      }
    };
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  setRequestTrackDetail(): void{
    
    this.paginator.firstPage();
    var dateRegex = new RegExp('([0-9]{2})(-)([0-9]{2})(-)([0-9]{4})');
    this.show = false;
    this.showNullTraceError=false;
    this.requestDateFrom= this.reqDateFrom.nativeElement.value;
    this.requestDateTo=this.reqDateTo.nativeElement.value;
    console.log("Request To Date  :  " + this.requestDateTo);
    console.log("Request From Date :  " + this.requestDateFrom);
    console.log("Req Id : "+this.requestId);
 

    if(this.requestId==null && this.requestBy==null && this.userId==null && this.requestStatus==null && this.appSelect==null && this.requestDateTo=="" && this.requestDateFrom==""){
      console.log("inside null of request trace");
      this.showNullTraceError=true;
      this.errorMessage=" * Please fill a field to search";

    }
    else {

      if((this.requestDateTo !="") || (this.requestDateFrom !="")){
      if((dateRegex.test(this.requestDateFrom))&&(dateRegex.test(this.requestDateTo))){
       let tempFromDate: Date=moment(this.requestDateFrom,"DD-MM-YYYY").toDate();
        let tempToDate : Date = moment(this.requestDateTo,"DD-MM-YYYY").toDate();
        console.log(tempFromDate + "    - -   "  + tempToDate );

        if(tempFromDate > tempToDate){
          this.showNullTraceError=true;
          this.errorMessage="* From Date can not be greater than To Date";
        }
        else{
          this.callRequestSearchService();
        }

      }
      else{
        if(this.requestDateTo != ""){
          if(!dateRegex.test(this.requestDateTo)){
            this.showNullTraceError=true;
            this.errorMessage=" * Please provide Date in dd-mm-yyyy format";
          }
          else if(this.requestDateFrom == ""){
              this.showNullTraceError=true;
              this.errorMessage=" * Please provide Request From Date";
        }
        else{
          if(dateRegex.test(this.requestDateFrom)){
            this.callRequestSearchService();
          }else{
            this.showNullTraceError=true;
            this.errorMessage=" * Please provide Date in dd-mm-yyyy format";
          }

        }
      }
     else if(this.requestDateFrom  != ""){
      if(dateRegex.test(this.requestDateFrom)){
        // console.log("From date search");
        this.callRequestSearchService();
      }else{
        this.showNullTraceError=true;
        this.errorMessage=" * Please provide Date in dd-mm-yyyy format";
      }

      }
      else{
          this.showNullTraceError=true;
          this.errorMessage=" * Please provide Date in dd-mm-yyyy format";
      }
  }
    }
    else{
      this.callRequestSearchService();
    }




}  
  
}

  callRequestSearchService(){
    this.showNullTraceError=false;
    this.RequestTrace_DATA = null;
    this.spinnerService.show();
    this.sub1=this.RequestTrack.setRequestTrackDetail(this.requestId,this.requestBy,this.userId,
      this.requestStatus,this.appSelect,this.requestDateFrom,this.requestDateTo).subscribe(
                requestTrackItems => {
                  this.requestTrackItems = requestTrackItems;
                  console.log(this.requestTrackItems);


                  if(this.requestTrackItems.errorMessage != null){

                    this.showNullTraceError=true;
                    this.errorMessage=this.requestTrackItems.errorMessage;
                    this.spinnerService.hide();
                  }
                  else {
                    if(this.requestTrackItems.list != null){
                      if(this.requestTrackItems.list.length > 0){
                        this.RequestTrace_DATA  = this.requestTrackItems.list;
                        this.dataSource=new MatTableDataSource<RequestTraceDetails>(this.RequestTrace_DATA);
                        //console.log(this.dataSource);
                        this.show = true;
                        this.ngAfterViewInit();

                    }else{
                      this.showNullTraceError=true;
                      this.errorMessage="* No Data Present for this search criteria";
                    }
                  }
                  else{
                    this.showNullTraceError=true;
                    this.errorMessage="* No Data Present for this search criteria";
                  } 
                    this.spinnerService.hide();
                }
            }
              )
  }

  clearNullFieldError(){
    //console.log("inside on focus");
    this.showNullTraceError=false;
    this.errorMessage="";
  }

  closeErrorDiv(){
    this.showNullTraceError=false;
    this.errorMessage="";
  }

//   onlyAlphabets(event) {
//     return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123);   
// }

//     onlyNumberKey(event) {
//       var charCode = (event.which) ? event.which : event.keyCode;
// 				if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//           return false;
// 				} else {
//           return true;
// 				}
//     }

// onlyAlphabets(event) {
//   var key = window.event ? event.keyCode : event.which;
// if (event.keyCode == 8 || event.keyCode == 46
// || event.keyCode == 37 || event.keyCode == 39) {
//   return true;
// }
// else if ((key > 64 && key < 91) || (key > 96 && key < 123)) {
//   return true;
// }
// else return false;
// };

// onlyNumberKey(event) {
//   var key = window.event ? event.keyCode : event.which;
// if (event.keyCode == 8 || event.keyCode == 46
// || event.keyCode == 37 || event.keyCode == 39) {
//   return true;
// }
// else if ( key < 48 || key > 57 ) {
//   return false;
// }
// else return true;
// };


onlyAlphabets(e:any) {
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
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {

    return false;
  } else {
    return true;
  }

}



  keyDownHandlerFPDate(event : KeyboardEvent){
    var regex = new RegExp("^[0-9\_]+$");
    if (regex.test(event.key)) {
    }else if(event.keyCode==8||event.keyCode==191||event.keyCode==18){
      
    }else{
      console.log("Invalid Key " + event.keyCode + ". Keypress prevented.");
      event.preventDefault();
    }
  }

  
  downloadExcelFile() :void{
  this.spinnerService.show();
 var excelReqData = { "userRequestId": this.requestTrackItems.list };

 console.log(excelReqData);

  this.sub2=this.RequestTrack.getRolesForAllUsers(excelReqData).subscribe(
   data =>{
     this.exceldata = data;
     console.log(this.exceldata);
     //console.log(this.exceldata.statusList);
     if(this.exceldata.statusList != null){
     this.RequestTrack.exportAsExcelFile(this.exceldata.statusList,'export_');
     }
     else{
      this.showNullTraceError=true;
      this.errorMessage="* System Error. Please contact to system Administrator.";

     }
     this.spinnerService.hide();
   }
 );

}


  setRoleApplication() : void{
    console.log("Inside set roll app");
    this.spinnerService.show();
    this.sub3=this.UserSearch.setRoleApplication().subscribe(
       data => {      
         this.data = data;
          this.appDataPresent=true;
         this.spinnerService.hide();
       });

     }

  resetValues() : void{
    this.requestId = null;
    this.requestBy= null;
    this.userId= null;
    this.requestStatus= null;
    this.appSelect= null;
    this.reqDateFrom.nativeElement.value="";
    this.reqDateTo.nativeElement.value="";
    this.show = false;
    this.showNullTraceError=false;
}

 
  setRequestAppRoleDetails(userId,requestId): void{
    this.spinnerService.show();
           console.log(userId);
           console.log(this.requestStatus);
          this.sub4=this.RequestTrack.setRequestAppRoleDetails(requestId,userId,this.requestStatus)
          .subscribe(
            requestAppRoleItems => {
              this.requestAppRoleItems = requestAppRoleItems;
              console.log(requestAppRoleItems);  
              this.spinnerService.hide();
              this.openDialog();
          }
        )
  }

  openDialog() {
    this.dialog.open(RequestTrackDialog, {
      data: this.requestAppRoleItems.list,
      disableClose: true
    });
    this.showapp = true;
  }

  ngOnDestroy(){
    if (this.sub1 != null) {
      this.sub1.unsubscribe();
    }
    if (this.sub2 != null) {
      this.sub2.unsubscribe();
    }
    if (this.sub3 != null) {
      this.sub3.unsubscribe();
    }
    if (this.sub4 != null) {
      this.sub4.unsubscribe();
    }
  }

}

@Component({
  selector: 'request-track-dialog',
  templateUrl: 'request-track-dialog.html',
  styleUrls: ['./request-track.component.css','../assets/css/emp2.css']
  
})
export class RequestTrackDialog {

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public requestDialog: MatDialogRef<RequestTrackDialog>) {}


  onCloseCancel(){
    this.requestDialog.close();
 }

}





export interface RequestTraceDetails {
  requestId: number;
  userId: number;
  branchId: string;
  requestBy: string;
  requestDate: string;
  requestReason: string;
  
}