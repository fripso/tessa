import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { GapiService } from '../../services/gapi.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit, OnDestroy {

    loggedIn: boolean;

    constructor(
        private gapi: GapiService,
        private ref: ChangeDetectorRef,
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        this.gapi.signInStatus$.subscribe(status => {
            if (status === true) {
                this.zone.run(() => this.router.navigate(['graph']));
            }
            console.log(status);
            this.loggedIn = status;
            this.ref.detectChanges();
        });
    }

    ngOnDestroy() {
        this.gapi.signInStatus$.unsubscribe();
    }

    login() {
        this.gapi.handleSignInClick().then(res => console.log(res));
    }



}
