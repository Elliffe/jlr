import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test_measurement_created')
  handleTestMeasurementCreated(data: any) {
    this.appService.handleTestMeasurmentCreated(data.value)
  }
}
