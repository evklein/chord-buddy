import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgressionsPageComponent } from './view-progressions-page.component';

describe('ViewProgressionsPageComponent', () => {
  let component: ViewProgressionsPageComponent;
  let fixture: ComponentFixture<ViewProgressionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProgressionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgressionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
