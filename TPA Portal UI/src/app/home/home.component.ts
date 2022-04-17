import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { UploadService } from '../service/upload.service';
 import {LogoutService} from '../service/logout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { validateFile, FileValidity } from '../util/function/validation-util';
import { isNullOrUndefined } from 'util';
import { UploadFileDocument } from '../util/interface/model/upload-file-document';
import {FileUploadResponse} from '../util/interface/response/FileUploadResponse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { SearchData } from '../util/interface/model/searchdata';




interface DialogData {
  response: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sub1: Subscription;
  public fileToUpload: File;
  public fileValidity: FileValidity;
  public TPAUploadForm: FormGroup;
  public showModal: boolean;
  public ResponseContent: string;
  public filename: string;
  public claimuploadType: string;
  public fileType: string;
  public firstname:string;
  public uploadType:string;
  public xmlData:string;
  // private timer: Observable<any>;
  userFlag : boolean;

  public showUploadFolder:boolean;
  public ClaimUploadTypeList: string[];

  public selectedFolder:string;
  public UserId:string;

  public label: boolean;

  public showBrowse1:boolean;

  constructor(private uploadService: UploadService ,private router : Router,public dialog: MatDialog,
    public logoutService: LogoutService,private spinnerService: Ng4LoadingSpinnerService) { 

      this.ClaimUploadTypeList = [];
      this.label=true;
      this.showUploadFolder=false;
      this.selectedFolder=null;
      this.showBrowse1=false;
    }


  // in Reactive form it's imp to declare form and attributes
  ngOnInit() 
  {
          this.TPAUploadForm = new FormGroup({
           filename: new FormControl({ value: '', disabled: true }, Validators.required),
           claimuploadType: new FormControl('', Validators.required), 
           });


       this.firstname=sessionStorage.getItem('firstname');
      this.uploadType=sessionStorage.getItem('UploadType');
      this.UserId= sessionStorage.getItem('UserId');


    
   if(this.UserId==="ICAI_HEALTHPI")
    {
      this.showBrowse1=true;
     this.showUploadFolder=true;
     this.label= false;
    }
    else{
      this.label=true;
      this.showUploadFolder=false;
      this.selectedFolder=this.uploadType;

    }


   this.ClaimUploadTypeList = ["ICAI Health Policy Upload", "ICAI PI Policy Upload"];

    this.fileToUpload = null;
    this.fileValidity = {
      valid: false,
      message: "",
    };
  }

  
   public onselectedUploadFolder(claimType:string)
   {

     console.log("selected folder"+claimType);
     this.selectedFolder=claimType;
     console.log("Searching documents");

   }

  
  public onSelectFile = (files: FileList) => {
    this.fileToUpload = files.item(0);
    this.fileValidity = validateFile(this.fileToUpload);
    if (this.fileValidity.valid) {
      console.log("Selected Valid File");
      this. filename = this.fileToUpload.name;
      this.TPAUploadForm.get('filename').setValue(this.filename);

      console.log("fileToUpload - "+ this.fileToUpload);
      console.log("filename - "+this.filename);
    }
     else {
      this.fileToUpload = null;
    }

    let extension: string = this.filename.slice(this.filename.lastIndexOf(".") + 1);
 //   console.log("------------------"+extension);
if(extension==="xml")
{
    const file = files.item(0);
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
        const xmlData: string = (evt as any).target.result;
        
       // console.log(xmlData);
        this.xmlData=xmlData;
        //console.log("============="+this.xmlData);
    };
    reader.readAsText(file);


    
  }
}

  public validateUpload = (): void => {
    this.spinnerService.show();   

     if (!this.TPAUploadForm.valid && isNullOrUndefined(this.fileToUpload)) {
       console.log("Errors in validation");
     }
       this.TPAUploadForm.updateValueAndValidity();

      if (isNullOrUndefined(this.fileToUpload)) {

        console.log("File Not Selected");
        this.TPAUploadForm.get('filename').setErrors({ required: true });
        this.TPAUploadForm.get('filename').markAsTouched();
        this.fileValidity.valid = false;
        this.fileValidity.message = "File is mandatory field required to be uploaded.";
        setTimeout(()=>{    
          console.log("timeout function");
          this.fileValidity.message = null;
      }, 5000);
this.spinnerService.hide();

      }


      if (this.selectedFolder===null)
       {
        if(this.UserId==="ICAI_HEALTHPI")
        {
        console.log("Folder Not Selected");
        this.TPAUploadForm.get('claimuploadType').setErrors({ required: true });
        this.TPAUploadForm.get('claimuploadType').markAsTouched();
        this.fileValidity.valid = false;
        this.fileValidity.message = "Folder is mandatory field";
        setTimeout(()=>{    
          console.log("timeout function");
          this.fileValidity.message = null;
      }, 3000);
this.spinnerService.hide();

      }
    }
    
    else 
     {

      //Render into file upload object
      let uploadFile: UploadFileDocument = {
        filename: this.TPAUploadForm.getRawValue().filename, //Needed because formcontrol is disabled
        file: this.fileToUpload,
       filedata:this.xmlData,
       claimUploadType:this.selectedFolder,
         }


         

      console.log("uploadtype-"+ sessionStorage.getItem('UploadType'));
      this.uploadService.uploadFileDocument(uploadFile)
        .then((response: FileUploadResponse) => {
          console.log("upload response"); 
           if (isNullOrUndefined(response.status)) {
             console.error("response status"+response.status);
             this.openDialog(response.errorMessage);
             this.spinnerService.hide();
             this.reset();
          } else {
            console.log("response message"+response.message);
            this.openDialog(response.message);  
            this.spinnerService.hide();
            this.reset();
    
           }
         
        }).catch((error: any) => {
          console.error("error------"+error);
           this.openDialog("Something went wrong; please try again later.");
           this.reset();
           this.spinnerService.hide();
          
        });
    }
  }

   openDialog(response:string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      height: '140px',
      data: {response: response}
    })
  };





  public showNotificationContent = (content: string) => {
    this.showModal = true;
      this.ResponseContent = content;

      setTimeout(()=>{    
        console.log("timeout function");
        this.showModal = false;
    }, 4000);

  }

  public reset = (): void => {
    console.log(this.TPAUploadForm.value);
    this.TPAUploadForm.get('filename').setValue('');
    this.TPAUploadForm.get('filename').markAsUntouched();
    this.fileToUpload = null
    console.log(this.TPAUploadForm.getRawValue());
  }
  }