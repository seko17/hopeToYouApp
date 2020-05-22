import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatReservationPageRoutingModule } from './seat-reservation-routing.module';

import { SeatReservationPage } from './seat-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatReservationPageRoutingModule
  ],
  declarations: [SeatReservationPage]
})
export class SeatReservationPageModule {}
