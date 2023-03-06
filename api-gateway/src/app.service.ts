import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTestMeasurement } from './dtos/create-test-measurement.dto';
import { TestMeasurementCreatedEvent } from './events/test-measurement-created.event';

@Injectable()
export class AppService {

  constructor(@Inject('TEST_MEASUREMENT_SERVICE') private readonly testMeasurementClient: ClientKafka) {

  }

  createTestMeasurement(createTestMeasurement: CreateTestMeasurement) {
    this.testMeasurementClient.emit('test_measurement_created', new TestMeasurementCreatedEvent(createTestMeasurement.testMeasurement))
  }
}
