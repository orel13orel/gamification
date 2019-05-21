import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbComponent } from './rb.component';

describe('RbComponent', () => {
  let component: RbComponent;
  let fixture: ComponentFixture<RbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
