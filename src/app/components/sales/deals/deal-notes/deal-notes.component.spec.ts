import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealNotesComponent } from './deal-notes.component';

describe('DealNotesComponent', () => {
  let component: DealNotesComponent;
  let fixture: ComponentFixture<DealNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
