import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoleUpdateRequestDialog,RoleUpdateResponseDialog, UserSearchComponent , ApplicationAndRoleDialog, PermissionListDialog, UnlockUserDialog} from './user-search/user-search.component';
import { RequestTrackComponent, RequestTrackDialog } from './request-track/request-track.component';
import { UploadExcelComponent, ExcelDataDialog,ResponseExcelDataDialog  } from './upload-excel/upload-excel.component';
import { DataTablesModule } from 'angular-datatables';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { RoleSelectorComponent , PermissionListInRoleDialog } from './role-selector/role-selector.component';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { UserSearchServiceService} from './UmsServices/user-search-service.service';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,MatProgressSpinnerModule, NativeDateModule, MatSortModule, MatCheckboxModule, MatAutocompleteModule, MatTabsModule, MatSelectModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RequestTrackServiceService } from './UmsServices/request-track-service.service';
import { UploadExcelServiceService } from './UmsServices/upload-excel-service.service';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { RoleServiceService } from './UmsServices/role-service.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatExpansionModule} from '@angular/material/expansion';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { LogoutComponent } from './logout/logout.component';
import { MatTableModule, MatPaginatorModule  } from '@angular/material'
import { HttpErrorInterceptor,ErrorPageDialog } from './http-error.interceptor';
import { UserIdleModule } from 'angular-user-idle';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserSearchComponent,
    RequestTrackComponent,
    UploadExcelComponent,
    RoleSelectorComponent,
    RequestTrackDialog ,
    ApplicationAndRoleDialog,
    ExcelDataDialog,
    PermissionListDialog,
    PermissionListInRoleDialog,
    UnlockUserDialog,
    RoleUpdateRequestDialog,
    RoleUpdateResponseDialog,
    ResponseExcelDataDialog,
    LogoutComponent,
    ErrorPageDialog,
   


  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NativeDateModule,
    BrowserAnimationsModule,
    ExcelExportModule,
    MatExpansionModule,
    BrowserTransferStateModule,
    TreeViewModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MatTableModule,
    MatPaginatorModule ,
    MatProgressSpinnerModule,
    MatSortModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule, 
    MatTabsModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    UserIdleModule.forRoot({idle: 600, timeout: 3, ping: 10})
  
    
    
  ],
  entryComponents: [
    RequestTrackDialog, 
    ApplicationAndRoleDialog, 
    ExcelDataDialog, 
    UnlockUserDialog,
    PermissionListDialog,
    RoleSelectorComponent, 
    PermissionListInRoleDialog,
    RoleUpdateRequestDialog,
    RoleUpdateResponseDialog,
    ResponseExcelDataDialog,
    ErrorPageDialog,
  ],
  providers: [
    UserSearchServiceService, 
    RequestTrackServiceService, 
    UploadExcelServiceService,
    RoleSelectorComponent, 
    RoleServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
