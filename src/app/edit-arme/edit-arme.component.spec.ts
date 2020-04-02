import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArmeComponent } from './edit-arme.component';

describe('ArmeDetailComponent', () => {
  let component: EditArmeComponent;
  let fixture: ComponentFixture<EditArmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
