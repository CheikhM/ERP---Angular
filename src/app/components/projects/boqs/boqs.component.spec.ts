import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqsComponent } from './boqs.component';

describe('BoqsComponent', () => {
  let component: BoqsComponent;
  let fixture: ComponentFixture<BoqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
