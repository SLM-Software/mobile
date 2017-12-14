// Module include
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// This import is part of "Creating an Authentication Service"
import { AuthService } from '../services/auth.service';

// Page declaration
import { Spotlightmart } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Spotlightmart,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    SearchPage
  ],
  imports: [
    BrowserModule, FormsModule,
    IonicModule.forRoot(Spotlightmart)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Spotlightmart,
    HomePage,
    TabsPage,
    LoginPage,
    SettingsPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // This service is part of "Adding an Authentication Service"
    AuthService
  ]
})
export class AppModule {}
