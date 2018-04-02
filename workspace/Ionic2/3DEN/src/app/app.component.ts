// Library include
import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

// Page declaration
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { ShoppingcartPage } from '../pages/shoppingcart/shoppingcart';
import { SeatreservationPage } from '../pages/seatreservation/seatreservation';
import { StorelocatorPage } from '../pages/storelocator/storelocator';
import { PersonaldetailPage } from '../pages/personaldetail/personaldetail';
import { PaymentmethodPage } from '../pages/paymentmethod/paymentmethod';
import { PaymentconfirmPage } from '../pages/paymentconfirm/paymentconfirm';

// This import is part of "Set Up Auth0-Cordova"
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class Spotlightmart {
  rootPage:any = LoginPage;

  constructor(platform: Platform, modalCtrl : ModalController, statusBar: StatusBar, splashScreen: SplashScreen, auth : AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Check if user is authenticated, if not present the login modal
      //if (!(auth.isAuthenticated() || auth.accessToken))
      //{
      //  let mdlLogin = modalCtrl.create(LoginPage);
      //  mdlLogin.present();
          this.rootPage = LoginPage;
      //}

      // This function is part of "Set Up Auth0-Cordova"
      (<any>window).handleOpenURL = (url) => {
        (<any>window).setTimeout(function() {
          Auth0Cordova.onRedirectUri(url);
        },100);
      };
    });
  }
}

