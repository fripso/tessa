import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GapiService } from '../services/gapi.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private gapi: GapiService, private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.gapi.clientLoaded$.getValue()) {
            return this.gapi.getStatus();
        }

        return this.gapi.loadClient()
            .then(res => {
                return this.gapi.initClient();
            })
            .then(res => {
                if (!this.gapi.getStatus()) {
                    this.router.navigate(['']);
                } else {
                    return this.gapi.getStatus();
                }
            });
    }
}
