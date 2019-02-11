import { Component, OnInit } from '@angular/core';
import { GapiService } from './services/gapi.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'tessa';

    constructor(
        private gapi: GapiService
    ) {}

    ngOnInit() {
        this.gapi.loadClient().then(
            result => {
                return this.gapi.initClient();
            }
        ).then(result => {
            this.gapi.clientLoaded$.next(true);
        });


    }
}
