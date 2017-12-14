import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
  // needed for auth0
  clientID: 'IJFpsoRAeFwfuR2TxsjxIEoL79pYLAD0',

  // needed for auth0cordova
  clientId: 'IJFpsoRAeFwfuR2TxsjxIEoL79pYLAD0',
  domain: 'spotlightmartdev.auth0.com',
  callbackURL: location.href,
  packageIdentifier: 'com.spotlight.retail'
};


@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    if (localStorage.getItem('expires_at') == null)
    {
      console.log("Token is empty, returning false");
      return false;
    }
    console.log("Token exipres at %o", localStorage.getItem('expires_at'));
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      console.log("Authorizing with Auth0...");
      if(err) {
        console.log("Error : %o", err);
        throw err;
      }
      console.log("Auth result : %o", authResult);
      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.setStorageVariable('expires_at', expiresAt);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }
        console.log("User profile : %o", profile);
        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    let profile = window.localStorage.getItem('profile');
    Object.keys(profile).forEach(function (key, index) 
    {
      console.log("Key : " + key + " Index : " + index);
    });
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }
}
