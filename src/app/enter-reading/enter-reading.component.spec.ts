import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterReadingComponent } from './enter-reading.component';

describe('EnterReadingComponent', () => {
  let component: EnterReadingComponent;
  let fixture: ComponentFixture<EnterReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
