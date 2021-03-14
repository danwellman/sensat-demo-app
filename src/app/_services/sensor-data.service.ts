import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SensorReading } from '../_models/sensor-reading';
import sensorData from '../../assets/data/sensor_readings.json';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  public getData(): Observable<SensorReading[]> {
    return of(sensorData as unknown as SensorReading[]);
  }
}
