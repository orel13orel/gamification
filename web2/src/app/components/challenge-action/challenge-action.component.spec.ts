import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeActionComponent } from './challenge-action.component';

describe('ChallengeActionComponent', () => {
  let component: ChallengeActionComponent;
  let fixture: ComponentFixture<ChallengeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
