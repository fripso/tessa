import { Injectable, NgZone } from '@angular/core';
import { credentials } from '../../secrets/google.js';
import { BehaviorSubject } from 'rxjs';
declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class GapiService {

    clientLoaded$ = new BehaviorSubject<boolean>(false);

    constructor(
        private zone: NgZone
    ) { }


    loadClient(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.zone.run(() => {
                gapi.load('client:auth2', {
                    callback: resolve,
                    onerror: reject,
                    timeout: 1000, // 5 seconds.
                    ontimeout: reject
                });
            });
        });
    }

    initClient(): Promise<any> {
       return new Promise((resolve, reject) => {
           this.zone.run(() => {
               gapi.client.init({
                   apiKey: credentials.apiKey,
                   discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                   clientId: credentials.clientId,
                   scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
               }).then(resolve, reject);
           });
        });
    }

    getUser(): any {
        if (this.getStatus()) {
            return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        }
    }

    getStatus(): boolean {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    handleSignInClick(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.zone.run(() => {
                return gapi.auth2.getAuthInstance().signIn();
            }).then(resolve, reject);
        });
    }

    handleSignOutClick(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.zone.run(() => {
                return gapi.auth2.getAuthInstance().signOut();
            }).then(resolve, reject);
        });
    }

    getSheet(ssid: string, dataRange: string): Promise<any> {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: ssid,
            range: dataRange
        });
    }

}
