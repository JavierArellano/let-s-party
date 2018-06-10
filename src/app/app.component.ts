import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, LoginPage } from '../pages/index.paginas';
import { AuthSProvider } from '../providers/auth-s/auth-s';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  login = LoginPage;
  home = HomePage;
  isLogged:boolean;

  rootPage:any = LoginPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthSProvider,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  loginF() {
  	this.auth.signOut();
    this.menuCtrl.toggle();
  	this.rootPage = this.login;
  }

  logout() {
  	this.auth.signOut();
    this.menuCtrl.toggle();
    this.isLogged=false;
  	this.rootPage = this.login;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = this.home;
            this.isLogged = true;
          } else {
            this.rootPage = this.login;
            this.isLogged = false;
          }
        },
        () => {
          this.rootPage = this.login;
          this.isLogged = false;
        }
      );
  }
}
