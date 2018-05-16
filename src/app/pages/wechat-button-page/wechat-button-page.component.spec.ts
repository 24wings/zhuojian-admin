import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatButtonPageComponent } from './wechat-button-page.component';

describe('WechatButtonPageComponent', () => {
  let component: WechatButtonPageComponent;
  let fixture: ComponentFixture<WechatButtonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatButtonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatButtonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
