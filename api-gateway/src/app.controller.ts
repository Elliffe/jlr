import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CreateTestMeasurement } from './dtos/create-test-measurement.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test-measurement')
  @UseInterceptors(FileInterceptor('file'))
  async createTestMeasurement(@Body() createTestMeasurement: CreateTestMeasurement, @UploadedFile() videoFile: Express.Multer.File) {
    let testMeasurement = await this.appService.createTestMeasurement(createTestMeasurement);
    // this.appService.processVideo(videoFile);
  }
}
