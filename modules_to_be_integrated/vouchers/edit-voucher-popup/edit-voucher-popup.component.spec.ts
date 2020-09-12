import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoucherPopupComponent } from './edit-voucher-popup.component';

describe('EditVoucherPopupComponent', () => {
  let component: EditVoucherPopupComponent;
  let fixture: ComponentFixture<EditVoucherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVoucherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoucherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
