import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConventionComponent } from './delete-convention.component';

describe('DeleteConventionComponent', () => {
  let component: DeleteConventionComponent;
  let fixture: ComponentFixture<DeleteConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
