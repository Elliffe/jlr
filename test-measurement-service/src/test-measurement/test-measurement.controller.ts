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
    return JSON.stringify(newTestMeasurement);
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
    console.log("updateTestMeasurement", updateTestMeasurementDto);
    
    return this.testMeasurementService.update(updateTestMeasurementDto.testMeasurementId, updateTestMeasurementDto);
  }

  @MessagePattern('removeTestMeasurement')
  remove(@Payload() id: string) {
    return this.testMeasurementService.remove(id);
  }
}
