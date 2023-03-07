import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { VideoServiceFactory } from './video.service.factory';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoCompressedEvent } from './events/video-compressed.event';
import { TestMeasurementStatus } from './enums/test-measurement-status.enum';
import { VideoCompressionFailedEvent } from './events/video-compression-failed.event';

@Controller()
export class VideoController {
  constructor(
    private readonly videoService: VideoServiceFactory,
    @Inject('TEST_MEASUREMENT_SERVICE') private readonly testMeasurementClient: ClientKafka
  ) { }

  @EventPattern('compressVideo')
  create(@Payload() createVideoDto: CreateVideoDto) {
    try {
      const compressedFile = this.videoService.compressVideo(createVideoDto.videoFile);
      const videoBlobUrl = this.videoService.createBlob(compressedFile, createVideoDto.testMeasurementId);
      this.testMeasurementClient.emit(
        'updateTestMeasurement', 
        new VideoCompressedEvent(createVideoDto.testMeasurementId, videoBlobUrl, TestMeasurementStatus.COMPLETE)
      )
    } catch (err) {
      this.testMeasurementClient.emit(
        'updateTestMeasurement', 
        new VideoCompressionFailedEvent(createVideoDto.testMeasurementId, err.message, TestMeasurementStatus.FAILED)
      )
    }
  }
}
