import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeCalculeComponent } from './mode-calcule.component';

describe('ModeCalculeComponent', () => {
  let component: ModeCalculeComponent;
  let fixture: ComponentFixture<ModeCalculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeCalculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeCalculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
