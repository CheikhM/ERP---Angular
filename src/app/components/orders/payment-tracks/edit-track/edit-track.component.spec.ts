import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackComponent } from './edit-track.component';

describe('EditTrackComponent', () => {
  let component: EditTrackComponent;
  let fixture: ComponentFixture<EditTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
