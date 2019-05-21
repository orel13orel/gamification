import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Action2Component } from './action2.component';

describe('Action2Component', () => {
  let component: Action2Component;
  let fixture: ComponentFixture<Action2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Action2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Action2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
