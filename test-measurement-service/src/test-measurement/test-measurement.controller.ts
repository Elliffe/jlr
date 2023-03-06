import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestMeasurementService } from './test-measurement.service';
import { CreateTestMeasurementDto } from './dtos/create-test-measurement.dto';
import { UpdateTestMeasurementDto } from './dtos/update-test-measurement.dto';

@Controller()
export class TestMeasurementController {
  constructor(private readonly testMeasurementService: TestMeasurementService) {}

  @MessagePattern('createTestMeasurement')
  create(@Payload() createTestMeasurementDto: CreateTestMeasurementDto) {
    return this.testMeasurementService.create(createTestMeasurementDto);
  }

  @MessagePattern('findAllTestMeasurement')
  findAll() {
    return this.testMeasurementService.findAll();
  }

  @MessagePattern('findOneTestMeasurement')
  findOne(@Payload() id: string) {
    return this.testMeasurementService.findOne(id);
  }

  @MessagePattern('updateTestMeasurement')
  update(@Payload() updateTestMeasurementDto: UpdateTestMeasurementDto) {
    return this.testMeasurementService.update(updateTestMeasurementDto._id, updateTestMeasurementDto);
  }

  @MessagePattern('removeTestMeasurement')
  remove(@Payload() id: string) {
    return this.testMeasurementService.remove(id);
  }
}
