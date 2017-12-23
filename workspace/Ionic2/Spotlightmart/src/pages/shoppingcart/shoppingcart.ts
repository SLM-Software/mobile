import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-shoppingcart',
  templateUrl: 'shoppingcart.html',
})
export class ShoppingcartPage {

  items = [
    { imageUrl : "http://via.placeholder.com/40x80", name : "Coca Cola 20oz bottle", quantity : 1 },
    { imageUrl : "http://via.placeholder.com/40x80", name : "Akaline Battery", quantity : 2 },
    { imageUrl : "http://via.placeholder.com/40x80", name : "iPhone USB Cable", quantity : 1 }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartPage');
  }

}
