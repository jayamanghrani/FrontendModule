import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router} from '@angular/router';
import { Observable } from 'rxjs';
import  { LoginResponse} from '../../app/util/interface/response/LoginResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  UploadFlag: boolean;

  constructor(private router: Router) {
  
  } 

  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log("In auth guard");
    console.log(state);
    console.log(next);
    
if(sessionStorage.getItem('loggedIn')==='true')
  return true;

  else 
     {
      // Hands the user to the LogIn page 
      alert("You are currently not logged in, please provide Login!")
      this.router.navigateByUrl( '/' );
      return false;
     }

  }

}

