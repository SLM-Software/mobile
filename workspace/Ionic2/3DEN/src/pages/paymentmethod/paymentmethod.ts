import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HTTP } from '@ionic-native/http';
import { PaymentconfirmPage } from '../../pages/paymentconfirm/paymentconfirm';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-paymentmethod',
  templateUrl: 'paymentmethod.html',
})
export class PaymentmethodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthService, public http : HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
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
