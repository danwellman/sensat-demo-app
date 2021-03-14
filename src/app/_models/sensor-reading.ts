export interface SensorReading {
  box_id: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  range_l: number;
  range_u: number;
  reading: number;
  reading_ts: string;
  sensor_type: string;
  unit: string;
}
