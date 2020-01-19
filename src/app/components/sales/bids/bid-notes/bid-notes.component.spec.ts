import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidNotesComponent } from './bid-notes.component';

describe('BidNotesComponent', () => {
  let component: BidNotesComponent;
  let fixture: ComponentFixture<BidNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
