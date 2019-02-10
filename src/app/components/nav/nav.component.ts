import { Component, OnInit } from '@angular/core';
import { GapiService } from 'src/app/services/gapi.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    status$: Observable<boolean>;

    constructor(
        private gapi: GapiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.status$ = this.gapi.signInStatus$;
    }

    signOut() {
        this.gapi.handleSignOutClick().then(() => this.router.navigate(['']));
    }

}
