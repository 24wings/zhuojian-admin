import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmOrderComponent } from './unconfirm-order.component';

describe('UnconfirmOrderComponent', () => {
  let component: UnconfirmOrderComponent;
  let fixture: ComponentFixture<UnconfirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnconfirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
