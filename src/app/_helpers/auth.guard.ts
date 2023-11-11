import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../pages/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRole = route.data['requiredRole'];
        const userRole = localStorage.getItem('role');

        const jwt = this.authService.getJWT();
        
        if (jwt && userRole === requiredRole) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}