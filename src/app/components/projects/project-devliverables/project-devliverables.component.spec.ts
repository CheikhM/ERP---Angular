import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDevliverablesComponent } from './project-devliverables.component';

describe('ProjectDevliverablesComponent', () => {
  let component: ProjectDevliverablesComponent;
  let fixture: ComponentFixture<ProjectDevliverablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDevliverablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDevliverablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
