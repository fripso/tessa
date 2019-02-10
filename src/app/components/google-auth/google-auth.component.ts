import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { GapiService } from '../../services/gapi.service';
import { Router, ActivationEnd } from '@angular/router';

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit, OnDestroy {


    constructor(
        private gapi: GapiService,
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        this.gapi.signInStatus$.subscribe( status => {
            if (status) {
                this.router.navigate(['graph']);
            }
        });
    }

    ngOnDestroy() {}

    login() {
        this.gapi.handleSignInClick()
            .then(() => this.zone.run(() => this.router.navigate(['graph'])))
            .catch(err => console.error(err));
    }



}
