import { Component, OnInit , ViewChild,OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SearchFolderResponse} from '../util/interface/response/searchFolderResponse';
import {DownloadFileResponse} from '../util/interface/response/DownloadFileresponse';
import { SearchData } from '../util/interface/model/searchdata';
import { SearchService} from 'src/app/service/search.service';
import { Router } from '@angular/router';
import {FileData,SearchFileResponse} from '../util/interface/response/SearchFileResponse';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {downloadURL} from '../util/constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

const MIME_TYPES={
 xls: 'application/vnd.ms-excel',
 xlxs:'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


 
export class SearchComponent implements OnInit ,OnDestroy, AfterViewInit {

         // Form Data 
         public TPASearchForm: FormGroup;

        //Folder List received from search service 
         public FolderList: SearchData[];

          //File List received from search service
          public FileList:FileData[]; 

        //Data source for Materials table. Uses filenameList as fuel
          public dataSource: MatTableDataSource<FileData>;
        
          //Columns for document display table
         public displayedColumns: String[];

           //Paginator and sort for Material Table
         @ViewChild(MatPaginator) paginator: MatPaginator;

         public userFlag:boolean;
         public showdiv:boolean;
         public show:boolean;
         public FolderDisplay:boolean;
         public selectedFolder:string;
        

  constructor(private searchService: SearchService,private router : Router,
    private httpclient: HttpClient,private spinnerService: Ng4LoadingSpinnerService) {

    this.FolderList = [];
    this.FileList = [];
    this.userFlag=false;
    this.FolderDisplay=false;
    this.show=false; 
    this.showdiv=false;

    this.displayedColumns = ['filename','Download']; 
  }

  ngOnInit() {
    // preventBack();
      this.dataSource = new MatTableDataSource(this.FileList);

    this.TPASearchForm = new FormGroup({
      FolderName: new FormControl('', Validators.required), 
  });

this.onselectTab();
}

ngOnDestroy() {
  this.dataSource.disconnect();
  this.FolderList = [];
  this.FileList = [];
}

public onselectTab()
{ // this.FolderList = ["MediAssist_POL", "MediAssist_POL_LOG", "MediAssist_CLM_LOG", "Reports"];

  console.log("search service");
  this.spinnerService.show();
  this.searchService.searchFolderList()
    .then( (response: SearchFolderResponse) => 
    { 
    console.log("search response");
    console.log("FolderList"+response.foldernameList);

    if(response.foldernameList!=null &&response.foldernameList.length>0)
    {
      this.FolderList = response.foldernameList;
    this.FolderDisplay=true;
    this.spinnerService.hide();
    } 
    
    else{ 
    alert("Some error occurred..Please try later!");
    this.spinnerService.hide();
    } 
    })
   .catch((error: any) => { 
  console.error("error------"+error);
  this.spinnerService.hide();
  
});
}

public onselectedFolder(folderName:string)
{ 
  console.log("selected folder"+folderName);
  this.selectedFolder=folderName;
  console.log("Searching documents");

  this.spinnerService.show();
  this.searchService.searchUploadedFiles(folderName)
  .then((response: SearchFileResponse) => 
    {
    console.log("Response recieved in component");
    this.FileList = response.filenameList;
    console.log("FileList"+this.FileList);

    if( this.FileList.length===0)
    {
      this.showdiv=true; 
      this.userFlag=false;
      this.show=false;    
      this.spinnerService.hide();
    }

    else{
     this.dataSource.data = this.FileList;   
     this.userFlag=true;
     this.showdiv=false;
     this.show=true;     
     this.ngAfterViewInit();
     this.spinnerService.hide();
    }
    
 })
   .catch((error: any) => {
  console.error("error------"+error);
  this.spinnerService.hide();
 
});
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}




public redirectToDownload(filename: string)
{
  console.log("downloading file"+ filename);
  
  this.searchService.downloadFile(filename,this.selectedFolder)
 

} 

}