import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitShopPagesComponent } from './submit-shop-pages.component';

describe('SubmitShopPagesComponent', () => {
  let component: SubmitShopPagesComponent;
  let fixture: ComponentFixture<SubmitShopPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitShopPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitShopPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
