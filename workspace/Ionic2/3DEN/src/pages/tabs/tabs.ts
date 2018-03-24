import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { SearchPage } from '../search/search';
import { ShoppingcartPage } from '../shoppingcart/shoppingcart';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homePage = HomePage;
  settingsPage = SettingsPage;
  searchPage = SearchPage;
  shoppingcartPage = ShoppingcartPage;
}
