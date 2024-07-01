import { CanActivateFn, Router,} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (
  route,
  state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }

};