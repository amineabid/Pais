import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCnssComponent } from './mod-cnss.component';

describe('ModCnssComponent', () => {
  let component: ModCnssComponent;
  let fixture: ComponentFixture<ModCnssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCnssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCnssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
