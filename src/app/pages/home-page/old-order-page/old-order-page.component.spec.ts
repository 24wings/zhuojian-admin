import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldOrderPageComponent } from './old-order-page.component';

describe('OldOrderPageComponent', () => {
  let component: OldOrderPageComponent;
  let fixture: ComponentFixture<OldOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
