import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Context2Component } from './context2.component';

describe('Context2Component', () => {
  let component: Context2Component;
  let fixture: ComponentFixture<Context2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Context2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Context2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
