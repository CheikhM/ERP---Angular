import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqComponent } from './edit-boq.component';

describe('EditBoqComponent', () => {
  let component: EditBoqComponent;
  let fixture: ComponentFixture<EditBoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBoqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
