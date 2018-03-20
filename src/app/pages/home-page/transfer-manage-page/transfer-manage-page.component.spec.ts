import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferManagePageComponent } from './transfer-manage-page.component';

describe('TransferManagePageComponent', () => {
  let component: TransferManagePageComponent;
  let fixture: ComponentFixture<TransferManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
