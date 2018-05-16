import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShopPageComponent } from './test-shop-page.component';

describe('TestShopPageComponent', () => {
  let component: TestShopPageComponent;
  let fixture: ComponentFixture<TestShopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestShopPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
