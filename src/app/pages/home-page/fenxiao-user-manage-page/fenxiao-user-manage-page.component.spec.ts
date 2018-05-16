import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenxiaoUserManagePageComponent } from './fenxiao-user-manage-page.component';

describe('FenxiaoUserManagePageComponent', () => {
  let component: FenxiaoUserManagePageComponent;
  let fixture: ComponentFixture<FenxiaoUserManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenxiaoUserManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenxiaoUserManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
