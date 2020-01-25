import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPopupComponent } from './edit-user-popup.component';

describe('EditUserPopupComponent', () => {
  let component: EditUserPopupComponent;
  let fixture: ComponentFixture<EditUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
