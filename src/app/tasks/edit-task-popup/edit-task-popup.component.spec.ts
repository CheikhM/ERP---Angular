import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPopupComponent } from './edit-task-popup.component';

describe('EditTaskPopupComponent', () => {
  let component: EditTaskPopupComponent;
  let fixture: ComponentFixture<EditTaskPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
