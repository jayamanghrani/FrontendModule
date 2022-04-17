import { Router } from '@angular/router';

export const preventBack = ():void =>{
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

/**
 * If user session is not valid, logs out user. 
 * Currently unused.
 * @param sessionValid 
 * @param router 
 */
export const checkSession = (sessionValid:boolean,router:Router):void =>{
    if(!sessionValid){
        console.log("Invalid session");
        router.navigate(['/logout']);
    }else{
        console.log("Valid session");
    }
}