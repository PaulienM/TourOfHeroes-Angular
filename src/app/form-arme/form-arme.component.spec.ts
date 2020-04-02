import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArmeComponent } from './form-arme.component';

describe('FormArmeComponent', () => {
  let component: FormArmeComponent;
  let fixture: ComponentFixture<FormArmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
