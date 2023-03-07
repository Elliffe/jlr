import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateTestMeasurement } from './dtos/create-test-measurement.dto';
import { CompressVideoEvent } from './events/compress-video.event';
import { TestMeasurementCreatedEvent } from './events/test-measurement-created.event';

@Injectable()
export class AppService {

  constructor(
    @Inject('TEST_MEASUREMENT_SERVICE') private readonly testMeasurementClient: ClientKafka,
    @Inject('VIDEO_COMPRESSION_SERVICE') private readonly videoCompressionClient: ClientKafka
  ) {

  }

  createTestMeasurement(createTestMeasurement: CreateTestMeasurement): Observable<any> {
    return this.testMeasurementClient.send(
      'createTestMeasurement',
      new TestMeasurementCreatedEvent(createTestMeasurement.testMeasurement)
    )
  }

  processVideo(testMeasurementId: string, videoFile: Express.Multer.File) {
    return this.videoCompressionClient.emit(
      'compressVideo', 
      new CompressVideoEvent(testMeasurementId, videoFile)
    )
  }
}
