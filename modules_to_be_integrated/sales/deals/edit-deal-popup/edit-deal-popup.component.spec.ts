import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealPopupComponent } from './edit-deal-popup.component';

describe('EditDealPopupComponent', () => {
  let component: EditDealPopupComponent;
  let fixture: ComponentFixture<EditDealPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDealPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDealPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
