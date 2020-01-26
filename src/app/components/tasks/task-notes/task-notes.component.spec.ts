import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotesComponent } from './task-notes.component';

describe('TaskNotesComponent', () => {
  let component: TaskNotesComponent;
  let fixture: ComponentFixture<TaskNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
