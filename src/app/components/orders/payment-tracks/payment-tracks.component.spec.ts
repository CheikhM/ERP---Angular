import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTracksComponent } from './payment-tracks.component';

describe('PaymentTracksComponent', () => {
  let component: PaymentTracksComponent;
  let fixture: ComponentFixture<PaymentTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
