import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  oAuth;

  constructor(public modalCtrl : ModalController, public auth: AuthService) {
    this.oAuth = auth;
  }

  ionViewDidLoad() {
    console.log("Entering ionViewDidLoad");
    if (!this.oAuth.isAuthenticated())
    {
      let mdlLogin = this.modalCtrl.create(LoginPage);
      mdlLogin.present();
    }
  }
}
