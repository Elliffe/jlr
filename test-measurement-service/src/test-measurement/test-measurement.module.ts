import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestMeasurementService } from './test-measurement.service';
import { TestMeasurementController } from './test-measurement.controller';
import { TestMeasurement, TestMeasurementSchema } from './schemas/test-measurement.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: TestMeasurement.name, schema: TestMeasurementSchema}])],
  controllers: [TestMeasurementController],
  providers: [TestMeasurementService]
})
export class TestMeasurementModule {}
