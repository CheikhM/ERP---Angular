import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemsComponent } from './purchase-items.component';

describe('PurchaseItemsComponent', () => {
  let component: PurchaseItemsComponent;
  let fixture: ComponentFixture<PurchaseItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
