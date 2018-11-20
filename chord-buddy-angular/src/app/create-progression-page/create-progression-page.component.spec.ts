import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgressionPageComponent } from './create-progression-page.component';

describe('CreateProgressionPageComponent', () => {
  let component: CreateProgressionPageComponent;
  let fixture: ComponentFixture<CreateProgressionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProgressionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgressionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
