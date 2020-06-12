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
  days = [1,2,3,4,5,6,7,8,9];
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
  sundaysInMonth(m, y) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // gets the number of days in a month
    const days = new Date(y, m, 0).getDate();
    const mon = new Date(y, m, 0);
    const month = mon.getMonth();
  //   gets the first sunday day in a month "May, 2020 = 3"
    const firstSunday = [8 - new Date(m + '/01/' + y).getDay()];
    const sundays = [];
    sundays.push(firstSunday[0] + ' ' + months[month] + ', Sunday');
    for (let i = firstSunday[0] + 7; i <= days; i += 7) {
    sundays.push(i + ' ' + months[month] + ', Sunday');
  }
    // this.days = sundays;
    console.log(sundays);
    
}
}
