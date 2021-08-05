import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemniteComponent } from './indemnite.component';

describe('IndemniteComponent', () => {
  let component: IndemniteComponent;
  let fixture: ComponentFixture<IndemniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndemniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndemniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
