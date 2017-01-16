import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = HomePage;
  zone: NgZone;
  constructor(platform: Platform) {

    const config = {
    apiKey: "AIzaSyD7-PkgpA-FePjzHNUT6ZCSmu05lQseeDU",
    authDomain: "lasttester-ff685.firebaseapp.com",
    databaseURL: "https://lasttester-ff685.firebaseio.com",
    storageBucket: "lasttester-ff685.appspot.com",
    messagingSenderId: "89329724924"
    };
    firebase.initializeApp(config);


    this.zone = new NgZone({});

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
      if (!user) {
        this.rootPage = LoginPage;
        } else {
        this.rootPage = HomePage;
        console.log("There's not a logged in user!");
      }
    });
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
