import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { UserAuthService } from "../services/user-auth";
import { UserService } from "../services/user";
import { firstValueFrom } from "rxjs";

export const LoginAuthGuard: CanActivateFn = async (route, state) => {
  const _userAuthService = inject(UserAuthService);
  const HAS_TOKEN = _userAuthService.getUserToken();
  const _userService = inject(UserService);
  const _router = inject(Router);

  if(!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());
   return  _router.navigate(['dashboard'])
  } catch (error) {
    return true
  }
}
