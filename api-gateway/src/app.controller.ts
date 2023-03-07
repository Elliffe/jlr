import { Body, Controller, Get, Inject, OnModuleInit, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { CreateTestMeasurement } from './dtos/create-test-measurement.dto';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('TEST_MEASUREMENT_SERVICE') private readonly testMeasurementClient: ClientKafka
  ) { }

  onModuleInit() {
    this.testMeasurementClient.subscribeToResponseOf('createTestMeasurement');
    this.testMeasurementClient.connect();
  }

  @Post('test-measurement')
  @UseInterceptors(FileInterceptor('file'))
  async createTestMeasurement(@Body() createTestMeasurement: CreateTestMeasurement, @UploadedFile() videoFile: Express.Multer.File) {
    const testMeasurement = await lastValueFrom(this.appService.createTestMeasurement(createTestMeasurement));
    this.appService.processVideo(testMeasurement._id, videoFile);
  }
}
