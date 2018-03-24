import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { PersonaldetailPage } from '../../pages/personaldetail/personaldetail';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';

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
  
  constructor(public viewCtrl : ViewController, public auth: AuthService, public  navCtrl: NavController, public http : HTTP) {
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

  private getAccessToken() {
    this.http.get(
      "https://demo.yackofamily.com/edeninfo/version",
      {},
      {
        'content-type' : 'application/json',
        'Authorization' : this.oAuth.idToken,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'
      }
    ).then (function(response) {
      console.log("Response : %o", JSON.parse(response.data));
    }).catch (function(err) {
        console.log("Error : %o", err);
    });
    
    
  }
  public btnLoginClicked() {
    if (!this.oAuth.isAuthenticated())
      this.oAuth.login();
  }

  public register() {
    this.navCtrl.push(PersonaldetailPage);
  }
  
  public getInfo() {
    this.getAccessToken();
  }
  public dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
