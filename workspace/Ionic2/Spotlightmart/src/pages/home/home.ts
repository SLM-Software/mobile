import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oAuth;
  slides = [
    { quot : '$1.00 Off Coke', img_url : 'http://via.placeholder.com/40x80', msg : 'Buy 20oz Coke Get $1.00 Off' },
    { quot : 'Free Cheerios', img_url : 'http://via.placeholder.com/40x80', msg : 'Buy 1 Get 1 Free' }
];

  constructor(public modalCtrl : ModalController, public auth: AuthService) {
    this.oAuth = auth;
  }

  ionViewDidEnter() {
    console.log("Entering HomePage ionViewDidEnter");
  }
}
