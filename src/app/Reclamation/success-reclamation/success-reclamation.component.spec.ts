import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessReclamationComponent } from './success-reclamation.component';

describe('SuccessReclamationComponent', () => {
  let component: SuccessReclamationComponent;
  let fixture: ComponentFixture<SuccessReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
