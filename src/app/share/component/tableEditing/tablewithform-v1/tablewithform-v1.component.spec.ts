import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablewithformV1Component } from './tablewithform-v1.component';

describe('TablewithformV1Component', () => {
  let component: TablewithformV1Component;
  let fixture: ComponentFixture<TablewithformV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablewithformV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablewithformV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
