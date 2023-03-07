import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
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
    this.testMeasurementClient.subscribeToResponseOf('findOneTestMeasurement');
    this.testMeasurementClient.connect();
  }

  @Post('test-measurement')
  @UseInterceptors(FileInterceptor('file'))
  async createTestMeasurement(@Body() createTestMeasurement: CreateTestMeasurement, @UploadedFile() videoFile: Express.Multer.File) {
    const testMeasurement = await firstValueFrom(this.appService.createTestMeasurement(createTestMeasurement));
    this.appService.processVideo(testMeasurement._id, videoFile);
    return testMeasurement;
  }

  @Get('test-measurement/:id')
  async getTestMeasurement(@Param('id') id: string) {
    return await firstValueFrom(this.appService.getTestMeasurement(id));
  }
}
