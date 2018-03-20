import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveProductOrderComponent } from './recive-product-order.component';

describe('ReciveProductOrderComponent', () => {
  let component: ReciveProductOrderComponent;
  let fixture: ComponentFixture<ReciveProductOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciveProductOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciveProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
