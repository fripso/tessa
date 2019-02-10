import { Injectable, NgZone } from '@angular/core';
import { credentials } from '../../secrets/google.js';
import { BehaviorSubject } from 'rxjs';
declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class GapiService {

    signInStatus$ = new BehaviorSubject<boolean>(null);

    constructor(
        private zone: NgZone
    ) { }

    loadClient() {
        gapi.load('client:auth2', this.initClient.bind(this));
    }

    private initClient() {
        gapi.client.init({
            apiKey: credentials.apiKey,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            clientId: credentials.clientId,
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
                this.zone.run(() => this.signInStatus$.next(isSignedIn));
            });

            // Handle the initial sign-in state.
            this.zone.run(() => this.signInStatus$.next(gapi.auth2.getAuthInstance().isSignedIn.get()));
        });
    }

    handleSignInClick(): Promise<any> {
        return gapi.auth2.getAuthInstance().signIn();
    }

    handleSignOutClick(): Promise<any> {
        return gapi.auth2.getAuthInstance().signOut();
    }

    getSheet(ssid: string, dataRange: string): Promise<any> {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: ssid,
            range: dataRange
        });
    }

}
