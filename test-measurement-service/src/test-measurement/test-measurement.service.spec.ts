import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestMeasurementService } from './test-measurement.service';
import { TestMeasurement } from './schemas/test-measurement.schema';
import { CreateTestMeasurementDto } from './dtos/create-test-measurement.dto';
import { UpdateTestMeasurementDto } from './dtos/update-test-measurement.dto';

const mockTestMeasurement: CreateTestMeasurementDto = { testMeasurement: '' };
const mockTestMeasurementModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnValue({ exec: jest.fn() }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn() }),
  findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn() }),
}

describe('TestMeasurementService', () => {
  let service: TestMeasurementService;
  let model: Model<TestMeasurement>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestMeasurementService,
        {
          provide: getModelToken(TestMeasurement.name),
          useValue: mockTestMeasurementModel
        },
      ],
    }).compile();

    service = module.get<TestMeasurementService>(TestMeasurementService);
    model = module.get<Model<TestMeasurement>>(getModelToken(TestMeasurement.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create TestMeasurement', () => {
    it(`Should call create on the model`, () => {
      service.create(mockTestMeasurement)
      expect(mockTestMeasurementModel.create).toBeCalled();
    });
  });

  describe('Find all TestMeasurements', () => {
    it(`Should call find on the model`, () => {
      service.findAll()
      expect(mockTestMeasurementModel.find).toBeCalled();
    });
  });

  describe('Find one TestMeasurement', () => {
    it(`Should call findById on the model`, () => {
      service.findOne('mock id')
      expect(mockTestMeasurementModel.findById).toBeCalled();
    });
  });

  describe('Update a TestMeasurement', () => {
    it(`Should call findByIdAndUpdate on the model`, () => {
      service.update('mock id', {testMeasurementId: 'mock id'})
      expect(mockTestMeasurementModel.findByIdAndUpdate).toBeCalled();
    });
  });

  describe('Remove a TestMeasurement', () => {
    it(`Should call findByIdAndDelete on the model`, () => {
      service.remove('mock id')
      expect(mockTestMeasurementModel.findByIdAndDelete).toBeCalled();
    });
  });
});
