import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GapiService } from './services/gapi.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'tessa';
    status: boolean;

    constructor(
        private gapi: GapiService,
        private ref: ChangeDetectorRef
        ) {}

        ngOnInit() {
            this.gapi.loadClient();
            this.gapi.signInStatus$.asObservable().subscribe(status => {
                    console.log(status);
                    this.status = status;
                    this.ref.detectChanges();
            });
        }
    }
