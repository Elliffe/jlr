import { Injectable } from '@nestjs/common';
import { CreateTestMeasurementDto } from './dtos/create-test-measurement.dto';
import { UpdateTestMeasurementDto } from './dtos/update-test-measurement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestMeasurement, TestMeasurementDocument } from './schemas/test-measurement.schema';

@Injectable()
export class TestMeasurementService {

  constructor(@InjectModel(TestMeasurement.name) private testMeasurementModel: Model<TestMeasurementDocument>) {

  }

  create(createTestMeasurementDto: CreateTestMeasurementDto) {
    return this.testMeasurementModel.create(createTestMeasurementDto);
  }

  findAll() {
    return this.testMeasurementModel.find().exec();
  }

  findOne(id: string) {
    return this.testMeasurementModel.findById(id).exec();
  }

  update(id: string, updateTestMeasurementDto: UpdateTestMeasurementDto) {
    return this.testMeasurementModel.findByIdAndUpdate(id, updateTestMeasurementDto).exec();
  }

  remove(id: string) {
    return this.testMeasurementModel.findByIdAndDelete(id).exec();
  }
}
