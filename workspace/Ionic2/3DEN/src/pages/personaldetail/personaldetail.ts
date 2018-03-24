import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-personaldetail',
  templateUrl: 'personaldetail.html',
})
export class PersonaldetailPage {

  name : string;
  email : string;
  phone : number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonaldetailPage');
  }

  public next() {

  }

  public clear() {

  }
}
