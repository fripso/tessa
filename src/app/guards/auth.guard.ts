import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GapiService } from '../services/gapi.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private gapi: GapiService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.gapi.signInStatus$.asObservable().pipe(
            map(status => {
                if (!status) {
                    this.router.navigate(['']);
                    return false;
                }
                return true;
            }));
    }
}
