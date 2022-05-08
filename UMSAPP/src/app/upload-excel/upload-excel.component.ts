import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { UploadExcelServiceService } from '../UmsServices/upload-excel-service.service';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserSearchServiceService } from '../UmsServices/user-search-service.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  
}

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css','../assets/css/emp2.css']

})
export class UploadExcelComponent implements OnInit, AfterViewInit {

  ExcelUserDetail_DATA : ExcelUserDetailsData[];
  displayedColumns = ['sno','userId','branchId','appName','roleName','action'];
  dataSource = new MatTableDataSource<ExcelUserDetailsData>();
  sort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set content (content : ElementRef){
    this.sort=content;
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  } 

  headerOptions : any;
  fileToUpload: File = null;
  fileName : string = null;
  fileData: FormData;
  updateResponse: any;
  Exceldata: any;
  show: boolean;
  showexceldata: boolean;
  showuploadbutton: boolean;
  showErrorField: boolean;
  errorMsg: any;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private UploadExcel: UploadExcelServiceService, public dialog: MatDialog,  private spinnerService: Ng4LoadingSpinnerService) {
    this.showErrorField=false;
   }
  
  ngOnInit() {
  
  }

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  closeErrorDiv(){
    this.showErrorField=false;
    this.errorMsg="";
  }
  
  selectExcelFile(files: FileList) {
    this.showErrorField=false;
    this.showexceldata = false;
    this.showuploadbutton =false;
    this.fileToUpload = files.item(0);    // Read File from Event
    this.fileName = files.item(0).name;   // Set Name in input field

    let fileType =files.item(0).name;
    if((fileType.endsWith('.xls'))||(fileType.endsWith('.xlsx'))){
      this.fileData= new FormData();
      this.fileData.append('file', this.fileToUpload);

    }else{
      this.showErrorField=true;
      this.errorMsg="* Please select a valid file format of .xls or .xlsx";
    }
    
    
}

  uploadExcelFile($event : any): void{
    this.showexceldata = false;
    this.showuploadbutton =false;
    if(this.fileData!=null){
      this.showErrorField= false;
      this.spinnerService.show();
      this.sub1=this.UploadExcel.uploadExcelFile(this.fileData).subscribe(Exceldata => {
        this.Exceldata = Exceldata;
        this.spinnerService.hide();
      
        if(this.Exceldata.userRoles != null){
          this.ExcelUserDetail_DATA=this.Exceldata.userRoles;
          this.dataSource=new MatTableDataSource<ExcelUserDetailsData>(this.ExcelUserDetail_DATA);
          this.ngAfterViewInit();
          this.openExcelDialog();
        }

      else{

        console.log("in else part");
        this.showexceldata = false;
        this.showuploadbutton =false;
        this.showErrorField=true;
        this.errorMsg="* Validation Failed";
        console.log(this.Exceldata.userRoles);
      }

    if(this.Exceldata.userRoles != null){
      for(let item of this.Exceldata.userRoles){
        if(item.branchId && item.roleId && item.appName && item.userId && item.action){
          this.showexceldata = true;
          this.showuploadbutton =true;
        }
      }
    }

    if(this.Exceldata.errorList != null){
      for(let item of this.Exceldata.errorList){
        if(item.error){
              this.showexceldata = false;
              this.showuploadbutton =false;
            }
  
        }
      }
    })
  }
  else{
    this.showErrorField=true;
    console.log("File not attached");
    this.errorMsg="* Please attach a valid file";
  }
  }


    //Upload excel role update Call

  uploadExcelUpdateRole(){
    this.spinnerService.show();
    this.sub2=this.UploadExcel.updateRole(this.Exceldata).subscribe(
      data =>{
        this.updateResponse = data;
        console.log(this.updateResponse);
        this.spinnerService.hide();
        this.openResponseExcel();
      }
    );



  }

  openExcelDialog(){
    let openExcelDialog = this.dialog.open(ExcelDataDialog, { 
      data: this.Exceldata,
      disableClose: true,
    }
    
    );

    openExcelDialog.afterClosed().subscribe(value => {
      if(value != null)
        console.log(value); 
  });

  }


  openResponseExcel(){
    console.log("Response from update: "  );
    console.log(  this.updateResponse);
    let responseExcelDialog = this.dialog.open(ResponseExcelDataDialog, { 
      data: this.updateResponse,
      disableClose: true,
    }

    );

    responseExcelDialog.afterClosed().subscribe(value => {
      if(value != null)
      console.log(value); 
      this.showexceldata = false;
     this.showuploadbutton =false;
  });
}

ngOnDestroy(){
  if (this.sub1 != null) {
    this.sub1.unsubscribe();
  }
  if (this.sub2 != null) {
    this.sub2.unsubscribe();
  }
}

}


@Component({
  selector: 'upload-excel-dialog',
  templateUrl: 'upload-excel-dialog.html',
  styleUrls: ['./upload-excel.component.css']

})
export class ExcelDataDialog {
  show :any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public openExcelDialog: MatDialogRef<ExcelDataDialog>) {
    this.show=true;

  }
  onCloseCancel(){
    this.openExcelDialog.close();
 }
  
}

@Component({
  selector: 'response-excel-dialog',
  templateUrl: 'response-excel-dialog.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class ResponseExcelDataDialog implements OnInit , OnDestroy{
  responseData : any;
  sub1: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private UserSearchService: UserSearchServiceService, public responseExcelDialog: MatDialogRef<ResponseExcelDataDialog>) {
    console.log( data);
    this.responseData= data;
  }
ngOnInit(){
    this.sub1=this.UserSearchService.callOSBServiceForRoleUpdate().subscribe(data => {
      console.log("response OSB");
      console.log(data);
    });
}
ngOnDestroy(){
  if (this.sub1 != null) {
    this.sub1.unsubscribe();
  }
}

  onCloseCancel(){
    this.responseExcelDialog.close();
 }
  
}


export interface ExcelUserDetailsData {
  sno: number;
  userId: number;
  branchId: string;
  roleId: string;
  roleName:string;
  appName: string;
  application: string;
  action: string;
}