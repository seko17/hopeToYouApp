import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IonSlides,
  IonSelectOption,
  IonSelect,
  NavController,
  IonRouterOutlet,
  IonDatetime,
  LoadingController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ManageProfilePage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild('selopt', { static: true }) selopt: IonSelect;
  @ViewChild('gender', { static: true }) gender: IonSelect;
  @ViewChild('DOB', { static: true }) dob: IonDatetime;
  @ViewChild('marital', { static: true }) marital: IonSelect;
  isEditing = false;
  mainContent = document.getElementsByClassName('main-content');
  bgMove = 0;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profileForm: FormGroup;
  profileImage;
  uploadProgress = 0;
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    private camera: Camera,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.splashScreen.hide();
    }, 2000);
    // form with 11 controls
    this.profileForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([Validators.required])),
      title: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      dob: new FormControl('', Validators.compose([Validators.required])),
      marrige: new FormControl('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      homeNumber: new FormControl(''),
      workNumber: new FormControl(''),
      homeAddress: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      workAddress: new FormControl(''),
      membership: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
    // for development only
    try {
      const state = this.router.getCurrentNavigation().extras;
      console.log(state);
      this.isEditing = state.state.isEditing;
    } catch (error) {
      console.log(error);
    }
    this.slides.lockSwipes(true);
    this.selopt.interface = 'popover';
    this.gender.interface = 'popover';
    this.marital.interface = 'popover';
    this.dob.mode = 'ios';
  }
  setBackgroundMovement() {
    this.renderer.setStyle(
      this.mainContent[0],
      'background-position',
      `${this.bgMove}%, center`
    );
  }
  selectOption(ev: CustomEvent) {
    console.log(ev.detail);
    console.log(ev.detail.value);
  }
  next() {
    this.bgMove = this.bgMove + 10;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.setBackgroundMovement();
    this.slides.lockSwipes(true);
  }
  back() {
    this.bgMove = this.bgMove - 10;
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.setBackgroundMovement();
    this.slides.lockSwipes(true);
  }
  async imageProgress(cmd) {
    const progresser = await this.toastCtrl.create({
      message: `Uploading ${this.uploadProgress}%`,
      position: 'middle'
    });
    switch (cmd) {
      case 'o':
        console.log('present p toast');
        await progresser.present();
        break;
      case 'c':
        console.log('remove p toast');
        await progresser.dismiss();
        break;
    }
  }
  async getImage() {
    let loaderPresented = false;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    };
    this.camera.getPicture(options).then((imagedata) => {
      const userImage = firebase.auth().currentUser.uid;
      const base64Image = `data:image/jpeg;base64,${imagedata}`;
      console.log(base64Image);
      const uploadTask = this.storage
        .child(userImage)
        .putString(base64Image, 'data_url');
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(this.uploadProgress);
          if (!loaderPresented) {
              this.imageProgress('o');
              loaderPresented = true;
            }
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            case firebase.storage.TaskState.SUCCESS: // or 'running'
              console.log('Upload is done');
              break;
            case firebase.storage.TaskState.ERROR: // or 'running'
              console.log('An error occured');
              break;
          }
        },
        (err) => {
          switch (err.name) {
            case 'storage/unauthorized':
              console.log('User doesn\'t have permission to access the object');

              break;

            case 'storage/canceled':
              console.log('User canceled the upload');

              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downUrl) => {
            this.profileImage = downUrl;
            console.log(this.profileImage);
            this.imageProgress('c');
            loaderPresented = false;
          });
        }
      );
    });
  }
  async submit(p) {
    const userProfile = {
      profile: p,
      uid: firebase.auth().currentUser.uid,
      profileImage: this.profileImage,
    };
    console.log(userProfile);
    const loader = await this.loadingCtrl.create();
    await loader.present();
    firebase.auth().onAuthStateChanged((user) => {
      this.db
        .collection('users')
        .doc(user.uid)
        .set(userProfile)
        .then(async (res) => {
          await loader.dismiss();
          this.navCtrl.navigateRoot('home');
        })
        .catch(async (err) => {
          await loader.dismiss();
          const alerter = await this.alertCtrl.create({
            message: err.message,
          });
          await alerter.present();
        });
    });
  }
}
