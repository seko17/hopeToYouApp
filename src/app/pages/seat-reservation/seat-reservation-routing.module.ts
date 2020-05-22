import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatReservationPage } from './seat-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: SeatReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatReservationPageRoutingModule {}
