import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTitleComponent } from './listing-title.component';

describe('ListingTitleComponent', () => {
  let component: ListingTitleComponent;
  let fixture: ComponentFixture<ListingTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
