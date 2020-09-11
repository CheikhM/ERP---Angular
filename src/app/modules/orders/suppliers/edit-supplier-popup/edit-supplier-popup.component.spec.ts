import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplierPopupComponent } from './edit-supplier-popup.component';

describe('EditSupplierPopupComponent', () => {
  let component: EditSupplierPopupComponent;
  let fixture: ComponentFixture<EditSupplierPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSupplierPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupplierPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
