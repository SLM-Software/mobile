import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { SeatreservationPage } from '../../pages/seatreservation/seatreservation';
import { StorelocatorPage } from '../storelocator/storelocator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oAuth;
  nav;

  slides = [
    { quot : '$1.00 Off Coke', img_url : 'http://via.placeholder.com/40x80', msg : 'Buy 20oz Coke Get $1.00 Off' },
    { quot : 'Free Cheerios', img_url : 'http://via.placeholder.com/40x80', msg : 'Buy 1 Get 1 Free' }
];

  constructor(public navCtrl : NavController, public modalCtrl : ModalController, public auth: AuthService) {
    this.oAuth = auth;
    this.nav = navCtrl;
  }

  ionViewDidEnter() {
    console.log("Entering HomePage ionViewDidEnter");
  }

  goToReservation() {
    this.nav.push(SeatreservationPage);
  }

  goToStoreLocator() {
    this.nav.push(StorelocatorPage);
  }
}
