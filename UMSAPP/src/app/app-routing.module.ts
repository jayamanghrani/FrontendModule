import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { RequestTrackComponent } from './request-track/request-track.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import {LogoutComponent} from './logout/logout.component';
// import { DocumentComponent } from './document/document.component';
// import { DocumentUserIdComponent } from './document-user-id/document-user-id.component';
// import { DocumentBranchComponent } from './document-branch/document-branch.component';
// import { DocumentOrganizationComponent } from './document-organization/document-organization.component';
// import { DocumentAuditTrailComponent } from './document-audit-trail/document-audit-trail.component';

const routes: Routes = [
  { path: '',
  redirectTo: 'userSearch',
  pathMatch: 'full'
},
  {
     path: 'userSearch', 
  component: UserSearchComponent,

},
  
{
  path: 'RequestTrack', 
component: RequestTrackComponent,

},

{
  path: 'UploadExcel', 
component: UploadExcelComponent,

},
{
  path: 'logout',
component : LogoutComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



