import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { IonSlides, IonSelectOption, IonSelect, NavController, IonRouterOutlet, IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ManageProfilePage implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  @ViewChild('selopt', {static: true}) selopt: IonSelect;
  @ViewChild('gender', {static: true}) gender: IonSelect;
  @ViewChild('DOB', {static: true}) dob: IonDatetime;
  @ViewChild('marital', {static: true}) marital: IonSelect;
  isEditing = false;
  mainContent = document.getElementsByClassName('main-content');
  bgMove = 0;
  constructor(private navCtrl: NavController, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras;
    console.log(state);
    this.isEditing = state.state.isEditing;
    this.slides.lockSwipes(true);
    this.selopt.interface = 'popover';
    this.gender.interface = 'popover';
    this.marital.interface = 'popover';
    this.dob.mode = 'ios';
  }
  setBackgroundMovement() {
    this.renderer.setStyle(this.mainContent[0], 'background-position', `${this.bgMove}%, center`);
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
  submit() {
    this.navCtrl.navigateRoot('home');
  }
}
