import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherNotesComponent } from './voucher-notes.component';

describe('VoucherNotesComponent', () => {
  let component: VoucherNotesComponent;
  let fixture: ComponentFixture<VoucherNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
