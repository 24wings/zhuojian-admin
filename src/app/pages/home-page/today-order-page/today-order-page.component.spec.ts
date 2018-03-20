import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayOrderPageComponent } from './today-order-page.component';

describe('TodayOrderPageComponent', () => {
  let component: TodayOrderPageComponent;
  let fixture: ComponentFixture<TodayOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
