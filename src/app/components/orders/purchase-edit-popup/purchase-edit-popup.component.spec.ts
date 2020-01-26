import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEditPopupComponent } from './purchase-edit-popup.component';

describe('PurchaseEditPopupComponent', () => {
  let component: PurchaseEditPopupComponent;
  let fixture: ComponentFixture<PurchaseEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
