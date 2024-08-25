import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authInterceptor: AuthInterceptor, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isLoggedIn = await this.authInterceptor.isLoggedIn();
    
    if (isLoggedIn) {
      return true;
    } else {
      // Redirigir a la página de login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}