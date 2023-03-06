import { Injectable } from '@nestjs/common';
import { TestMeasurementCreatedEvent } from './events/test-measurement-created.event';

@Injectable()
export class AppService {
  handleTestMeasurmentCreated(testMeasurementCreatedEvent: TestMeasurementCreatedEvent) {
    console.log(testMeasurementCreatedEvent);
    
  }
}
