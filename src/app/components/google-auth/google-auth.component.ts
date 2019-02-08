import { Component, OnInit } from '@angular/core';
import { credentials } from '../../../secrets/google.js';

declare const gapi: any;

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        this.handleClientLoad();
    }

    handleClientLoad() {
        // Loads the client library and the auth2 library together for efficiency.
        // Loading the auth2 library is optional here since `gapi.client.init` function will load
        // it if not already loaded. Loading it upfront can save one network request.
        gapi.load('client:auth2', this.initClient.bind(this));
    }

    initClient() {

        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        gapi.client.init({
            apiKey: credentials.apiKey,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            clientId: credentials.clientId,
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        }).then(() => {

            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(() => this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    updateSigninStatus(isSignedIn) {
        console.log(isSignedIn);
        // When signin status changes, this function is called.
        // If the signin status is changed to signedIn, we make an API call.
        if (isSignedIn) {
            this.makeApiCall();
        }
    }

    handleSignInClick(event) {
        // Ideally the button should only show up after gapi.client.init finishes, so that this
        // handler won't be called before OAuth is initialized.
        gapi.auth2.getAuthInstance().signIn().then( res => console.log(res))    ;
    }

    handleSignOutClick(event) {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            console.log('logged out');
        });
    }

    makeApiCall() {
        // Make an API call to the People API, and print the user's given name.
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            range: 'Class Data!A2:E'
        }).then((response) => {
            console.log('Success');
            console.log(response);
        }, (reason) => {
            console.log('Error: ' + reason.result.error.message);
        });
    }


}
