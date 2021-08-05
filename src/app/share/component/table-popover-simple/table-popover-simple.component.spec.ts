import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePopoverSimpleComponent } from './table-popover-simple.component';

describe('TablePopoverSimpleComponent', () => {
  let component: TablePopoverSimpleComponent;
  let fixture: ComponentFixture<TablePopoverSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePopoverSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePopoverSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
