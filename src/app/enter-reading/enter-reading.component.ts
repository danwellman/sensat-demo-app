import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-reading',
  templateUrl: './enter-reading.component.html',
  styleUrls: ['./enter-reading.component.scss']
})
export class EnterReadingComponent implements OnInit {
  public readingForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  public ngOnInit(): void {
    this.readingForm = this.fb.group({
      id: ['', Validators.required],
      box_id: ['', Validators.required],
      sensor_type: ['', Validators.required],
      name: ['', Validators.required],
      range_l: ['', Validators.required],
      range_u: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      reading: ['', Validators.required],
      unit: ['', Validators.required],
      reading_ts: ['', Validators.required],
    });
  }

}
