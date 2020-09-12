import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneficiaryPopupComponent } from './edit-beneficiary-popup.component';

describe('EditBeneficiaryPopupComponent', () => {
  let component: EditBeneficiaryPopupComponent;
  let fixture: ComponentFixture<EditBeneficiaryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBeneficiaryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeneficiaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
