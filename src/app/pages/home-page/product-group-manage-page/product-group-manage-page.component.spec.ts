import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupManagePageComponent } from './product-group-manage-page.component';

describe('ProductGroupManagePageComponent', () => {
  let component: ProductGroupManagePageComponent;
  let fixture: ComponentFixture<ProductGroupManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
