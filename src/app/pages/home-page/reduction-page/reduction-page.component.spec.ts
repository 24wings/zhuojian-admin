import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionPageComponent } from './reduction-page.component';

describe('ReductionPageComponent', () => {
  let component: ReductionPageComponent;
  let fixture: ComponentFixture<ReductionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReductionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReductionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
