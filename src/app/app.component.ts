import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl : NavController
  ) {
    this.initializeApp();
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().collection('Users').where("uid" , "==", user.uid).onSnapshot( res =>{
          if(res.empty){
            this.navCtrl.navigateRoot('user-details')
          }else{
            this.router.navigateByUrl("/home");
            unsubscribe();
          }
        })
      
      } else {
        this.router.navigateByUrl("/login"); 
        unsubscribe();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
