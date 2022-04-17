import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
 import { HomeComponent} from './home/home.component';
  import { AuthGuard } from './guard/auth.guard';
 import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [ 
  {path: '', 
  component: LoginComponent
  },

  {path: 'homeupload',  
     canActivate: [AuthGuard], 
   loadChildren:'./home/home.module#HomeModule'
  },
  
  {path: 'homesearch', 
    canActivate: [AuthGuard],
   loadChildren:'./search/search.module#SearchModule'
  }, 
  
 

  {path: 'logout',
   component:LogoutComponent
  },

  { path: '**',
    redirectTo: '/'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

