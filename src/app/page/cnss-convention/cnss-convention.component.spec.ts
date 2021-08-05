import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnssConventionComponent } from './cnss-convention.component';

describe('CnssConventionComponent', () => {
  let component: CnssConventionComponent;
  let fixture: ComponentFixture<CnssConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnssConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnssConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
