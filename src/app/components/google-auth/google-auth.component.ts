import { Component, OnInit, NgZone } from '@angular/core';
import { GapiService } from '../../services/gapi.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {
    loading = true;
    loggedIn: boolean;
    user: any;
    constructor(
        private gapi: GapiService,
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        this.gapi.clientLoaded$.subscribe(status => {
            if (status) {
                this.loading = false;
                this.loggedIn = this.gapi.getStatus();
                if (this.loggedIn) {
                    this.user = this.gapi.getUser();
                }
            }
        });
    }

    login() {
        this.gapi.handleSignInClick()
            .then(() => this.router.navigate(['graph']));
    }

    logout() {
        this.gapi.handleSignOutClick().then(() => this.loggedIn = this.gapi.getStatus());
    }



}
