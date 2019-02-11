import { Component, OnInit, NgZone } from '@angular/core';
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
    image: string;

    constructor(
        private gapi: GapiService,
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        this.image = this.gapi.getUser().getImageUrl();
    }

    signOut() {
        this.gapi.handleSignOutClick().then(() => this.router.navigate(['']));
    }

}
