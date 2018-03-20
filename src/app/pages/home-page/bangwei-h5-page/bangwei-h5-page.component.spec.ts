import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangweiH5PageComponent } from './bangwei-h5-page.component';

describe('BangweiH5PageComponent', () => {
  let component: BangweiH5PageComponent;
  let fixture: ComponentFixture<BangweiH5PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangweiH5PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangweiH5PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
