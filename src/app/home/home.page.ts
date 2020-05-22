import { Component } from "@angular/core";
import { ActionSheetController, ModalController, NavController } from "@ionic/angular";
import { SeatReservationPage } from "../pages/seat-reservation/seat-reservation.page";
import { NavigationExtras } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
// tslint:disable-next-line: component-class-suffix
export class HomePage {
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  isBooking = false;
  constructor(
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {}
  async avatarClick() {
    const a = await this.actionCtrl.create({
      translucent: false,
      mode: "ios",
      buttons: [
        {
          text: "Edit Profile",
          handler: () => {
            const navExtra: NavigationExtras = {
              state: {
                isEditing: true
              }
            };
            this.navCtrl.navigateRoot('manage-profile', navExtra);
          }
        },
        {
          text: "Sign Out",
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await a.present();
  }
  async seatReservation(cmd, day) {
    if (cmd == 'o') {
      console.log(day);
      this.isBooking = true;
    } else {
      this.isBooking = false;
    }
  }
}
