import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagePageComponent } from './store-manage-page.component';

describe('StoreManagePageComponent', () => {
  let component: StoreManagePageComponent;
  let fixture: ComponentFixture<StoreManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
