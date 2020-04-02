import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArmeComponent } from './create-arme.component';

describe('CreateArmeComponent', () => {
  let component: CreateArmeComponent;
  let fixture: ComponentFixture<CreateArmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
