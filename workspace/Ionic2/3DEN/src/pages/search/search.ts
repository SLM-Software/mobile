import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  selectedCategories = "";

  categories = [
    { id : 'grocery', name : 'Grocery' },
    { id : 'frozen_beverages', name : 'Frozen Beverages' },
    { id : 'frozen_foods', name : 'Frozen Foods' },
    { id : 'snacks', name : 'Snacks' },
    { id : 'batteries', name : 'Batteries' },
    { id : 'accessories', name : 'Accessories' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public btnSearchClicked()
  {

  }
}
