import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConventionComponent } from './detail-convention.component';

describe('DetailConventionComponent', () => {
  let component: DetailConventionComponent;
  let fixture: ComponentFixture<DetailConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
