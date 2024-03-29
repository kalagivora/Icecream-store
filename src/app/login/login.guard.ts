import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '.././services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userSubject.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (!isAuth) {
          return true;
        }
        if (user.role === 'admin') {
          return this.router.createUrlTree(['/admin-home']);
        } else {
          return this.router.createUrlTree(['/home']);
        }
      })
    );
  }
}
