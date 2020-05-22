import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeatReservationPage } from './seat-reservation.page';

describe('SeatReservationPage', () => {
  let component: SeatReservationPage;
  let fixture: ComponentFixture<SeatReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
