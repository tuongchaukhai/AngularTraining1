import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const roles = route.data['roles'] as string[];
    if (this.authService.isLoggedIn()) {
      if (roles && !roles.includes(this.authService.userRole)) {
        alert("Can't access this page");
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
