import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class RegisterPage implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  login() {
    this.navCtrl.navigateBack('login');
  }
  manageProfile() {
    const navExtra: NavigationExtras = {
      state: {
        isEditing: false
      }
    };
    this.navCtrl.navigateRoot('manage-profile', navExtra);
  }
}
