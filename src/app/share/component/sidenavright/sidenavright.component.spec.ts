import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavrightComponent } from './sidenavright.component';

describe('SidenavrightComponent', () => {
  let component: SidenavrightComponent;
  let fixture: ComponentFixture<SidenavrightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavrightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
