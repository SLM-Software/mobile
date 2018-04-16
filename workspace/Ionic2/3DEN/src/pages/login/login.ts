import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { PersonaldetailPage } from '../../pages/personaldetail/personaldetail';
import { HTTP } from '@ionic-native/http';
import Auth0 from 'auth0-js';
import { PaymentconfirmPage } from '../../pages/paymentconfirm/paymentconfirm';

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

  oAuth : any;
  loadingCtrl : any;

  constructor(public viewCtrl : ViewController, public auth: AuthService, public  navCtrl: NavController, public loadingController : LoadingController, public http : HTTP) {
    this.oAuth = auth;
    this.loadingCtrl = this.loadingController.create({
      content: "Loading..."
    });
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
    if (!this.oAuth.isAuthenticated()) {
      this.oAuth.login();
    }
  }

  public register() {
  }
  
  public getInfo() {
    this.loadingCtrl.present();    
    console.log("Access Token : " + this.oAuth.accessToken);
    this.http.get(
      "https://demo.yackofamily.com/edeninfo/version",
      {},
      {
        'content-type' : 'application/json',
        'Authorization' : this.oAuth.accessToken,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'
      }
    ).then (function(response) {
      console.log("Response : " + response.data);

      let oResponse = JSON.parse(response.data);
      alert(JSON.stringify(oResponse.retPack));
    }).catch (function(err) {
        console.log("Error : %o", err);
    });
    this.loadingCtrl.dismiss();
  }

  public next() {
    this.navCtrl.push(PaymentconfirmPage);
  }

  public btnApplePayClicked() {
    this.navCtrl.push(PaymentconfirmPage);
  }

  public btnPayPalClicked() {
    this.navCtrl.push(PaymentconfirmPage);    
  }

  public btnGooglePayClicked() {
    this.navCtrl.push(PaymentconfirmPage);
  }

  public btnAddCreditCardClicked() {
    
  }
  
}
