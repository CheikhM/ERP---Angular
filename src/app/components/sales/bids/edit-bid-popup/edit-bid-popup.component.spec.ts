import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidPopupComponent } from './edit-bid-popup.component';

describe('EditBidPopupComponent', () => {
  let component: EditBidPopupComponent;
  let fixture: ComponentFixture<EditBidPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBidPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
