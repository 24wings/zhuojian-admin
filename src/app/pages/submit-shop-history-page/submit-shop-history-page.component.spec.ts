import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitShopHistoryPageComponent } from './submit-shop-history-page.component';

describe('SubmitShopHistoryPageComponent', () => {
  let component: SubmitShopHistoryPageComponent;
  let fixture: ComponentFixture<SubmitShopHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitShopHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitShopHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
