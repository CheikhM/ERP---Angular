import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitPopupComponent } from './edit-visit-popup.component';

describe('EditVisitPopupComponent', () => {
  let component: EditVisitPopupComponent;
  let fixture: ComponentFixture<EditVisitPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
