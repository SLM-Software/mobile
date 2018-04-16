import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HTTP } from '@ionic-native/http';
import { StorelocatorPage } from '../../pages/storelocator/storelocator';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-paymentconfirm',
  templateUrl: 'paymentconfirm.html',
})
export class PaymentconfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthService, public http : HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public btnStartClicked() {
    this.navCtrl.setRoot(StorelocatorPage);
  }
}
