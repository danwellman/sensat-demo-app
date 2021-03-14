import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { EnterReadingComponent } from './enter-reading.component';

describe('EnterReadingComponent', () => {
  let component: EnterReadingComponent;
  let fixture: ComponentFixture<EnterReadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterReadingComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
    });

    fixture = TestBed.createComponent(EnterReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('creates the form', () => {
      component.readingForm = null;

      component.ngOnInit();

      expect(component.readingForm).not.toBeNull();
    });
  });
});
