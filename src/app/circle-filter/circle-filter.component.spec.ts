import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleFilterComponent } from './circle-filter.component';

describe('CircleFilterComponent', () => {
  let component: CircleFilterComponent;
  let fixture: ComponentFixture<CircleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
