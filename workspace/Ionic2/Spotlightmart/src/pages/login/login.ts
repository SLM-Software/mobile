import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  oAuth;
  
  constructor(public viewCtrl : ViewController, public auth: AuthService) {
    this.oAuth = auth;
  }

  ionViewDidLoad() {
    console.log("Entering ionViewDidLoad");
    if (this.oAuth.isAuthenticated())
    {
      console.log("User object : %o", this.oAuth.User);
      console.log("ID token: %o", this.oAuth.idToken);
      console.log("Access token : %o", this.oAuth.accessToken);
    }
}

  public btnLoginClicked() {
    if (!this.oAuth.isAuthenticated())
      this.oAuth.login();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
