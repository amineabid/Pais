import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEdtingWithComponentComponent } from './table-edting-with-component.component';

describe('TableEdtingWithComponentComponent', () => {
  let component: TableEdtingWithComponentComponent;
  let fixture: ComponentFixture<TableEdtingWithComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEdtingWithComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEdtingWithComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
