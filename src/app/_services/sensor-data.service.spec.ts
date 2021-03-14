import { TestBed } from '@angular/core/testing';

import { SensorDataService } from './sensor-data.service';

describe('SensorDataService', () => {
  let service: SensorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorDataService);
  });

  describe('getData()', () => {
    it('returns an observable', () => {
      const result = service.getData();

      expect(result.subscribe).toBeDefined();
    });
  });
});
