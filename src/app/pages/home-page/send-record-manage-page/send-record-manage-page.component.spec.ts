import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRecordManagePageComponent } from './send-record-manage-page.component';

describe('SendRecordManagePageComponent', () => {
  let component: SendRecordManagePageComponent;
  let fixture: ComponentFixture<SendRecordManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRecordManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRecordManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
