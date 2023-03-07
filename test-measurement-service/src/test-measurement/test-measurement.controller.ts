import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestMeasurementService } from './test-measurement.service';
import { CreateTestMeasurementDto } from './dtos/create-test-measurement.dto';
import { UpdateTestMeasurementDto } from './dtos/update-test-measurement.dto';

@Controller()
export class TestMeasurementController {
  constructor(private readonly testMeasurementService: TestMeasurementService) {}

  @MessagePattern('createTestMeasurement')
  async create(@Payload() createTestMeasurementDto: CreateTestMeasurementDto) {
    const newTestMeasurement = await this.testMeasurementService.create(createTestMeasurementDto);
    return newTestMeasurement.toObject();
  }

  @MessagePattern('findAllTestMeasurement')
  async findAll() {
    return (await this.testMeasurementService.findAll()).toString();
  }

  @MessagePattern('findOneTestMeasurement')
  async findOne(@Payload() id: string) {
    return (await this.testMeasurementService.findOne(id)).toObject();
  }

  @MessagePattern('updateTestMeasurement')
  async update(@Payload() updateTestMeasurementDto: UpdateTestMeasurementDto) {
    return (await this.testMeasurementService.update(updateTestMeasurementDto.testMeasurementId, updateTestMeasurementDto)).toObject();
  }

  @MessagePattern('removeTestMeasurement')
  remove(@Payload() id: string) {
    return this.testMeasurementService.remove(id);
  }
}
