import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('test_measurement_created')
  async handleTestMeasurementCreated(data: any) {
    return await this.appService.handleTestMeasurmentCreated(data)
  }
}
