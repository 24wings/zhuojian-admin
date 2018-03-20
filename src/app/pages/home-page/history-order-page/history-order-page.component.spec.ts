import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrderPageComponent } from './history-order-page.component';

describe('HistoryOrderPageComponent', () => {
  let component: HistoryOrderPageComponent;
  let fixture: ComponentFixture<HistoryOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
