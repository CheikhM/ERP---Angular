import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPopupComponent } from './edit-project-popup.component';

describe('EditProjectPopupComponent', () => {
  let component: EditProjectPopupComponent;
  let fixture: ComponentFixture<EditProjectPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
