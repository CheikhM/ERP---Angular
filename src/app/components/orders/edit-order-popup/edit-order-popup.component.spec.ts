import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderPopupComponent } from './edit-order-popup.component';

describe('EditOrderPopupComponent', () => {
  let component: EditOrderPopupComponent;
  let fixture: ComponentFixture<EditOrderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
