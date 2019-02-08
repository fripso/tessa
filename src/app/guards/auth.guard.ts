import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GapiService } from '../services/gapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private gapi: GapiService , private router: Router) {
    }

    canAccess: boolean;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const redirectUrl = state.url;

        if (this.gapi.signInStatus$.getValue() === true) {
            return true;
        }

        this.router.navigateByUrl(
            this.router.createUrlTree(
                [''], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );

        return false;
    }
}

