import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  auth = firebase.auth();
  globalLoader;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      {
        type: 'minlength',
        message: 'Email must be at least 4 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Email cannot be more than 25 characters long.',
      },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password cannot be more than 25 characters long.',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private splashScreen: SplashScreen
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.splashScreen.hide();
    }, 2000);
    // build form on load
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      pwd: new FormControl('', Validators.required),
    });
  }
  async login(v) {
    // loader
    const loader = this.globalLoader = await this.loadingCtrl.create();
    loader.present();

    // signin auth
    this.auth
      .signInWithEmailAndPassword(v.email, v.pwd)
      .then(async (res) => {
        loader.dismiss();
        const toaster = await this.toastCtrl.create({
          message: 'Signin Successful',
          mode: 'ios',
          duration: 3000,
        });
        await toaster.present();
        this.navCtrl.navigateForward('home');
      }) // error statement
      .catch(async (err) => {
        loader.dismiss();
        const alerter = await this.alertCtrl.create({
          message: `${err.message}`,
          mode: 'ios',
          buttons: [{
            text: 'Okay',
            role: 'cancel',
            handler: () => {
              this.loginForm.reset();
            }
          }]
        });
        await alerter.present();
      });
  }
  // register page
  register() {
    this.navCtrl.navigateForward('register');
  }
}
