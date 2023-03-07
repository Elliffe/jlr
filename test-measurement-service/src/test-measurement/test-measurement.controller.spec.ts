import { Test, TestingModule } from '@nestjs/testing';
import { CreateTestMeasurementDto } from './dtos/create-test-measurement.dto';
import { TestMeasurementController } from './test-measurement.controller';
import { TestMeasurementService } from './test-measurement.service';

const mockTestMeasurement: CreateTestMeasurementDto = { testMeasurement: '' };
const mockTestMeasurementService = {
  create: jest.fn().mockReturnValue({ toObject: jest.fn() }),
  findAll: jest.fn().mockReturnValue({ toObject: jest.fn() }),
  findOne: jest.fn().mockReturnValue({ toObject: jest.fn() }),
  update: jest.fn().mockReturnValue({ toObject: jest.fn() }),
  remove: jest.fn()
}

describe('TestMeasurementController', () => {
  let controller: TestMeasurementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestMeasurementController],
      providers: [
        {
          provide: TestMeasurementService,
          useValue: mockTestMeasurementService
        },
      ],
    }).compile();

    controller = module.get<TestMeasurementController>(TestMeasurementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it(`Should call create on the service`, async () => {
      await controller.create(mockTestMeasurement)
      expect(mockTestMeasurementService.create).toBeCalled();
    })
  })

  describe('findAll', () => {
    it(`Should call findAll on the service`, async () => {
      await controller.findAll()
      expect(mockTestMeasurementService.findAll).toBeCalled();
    })
  })

  describe('findOne', () => {
    it(`Should call findOne on the service`, async () => {
      await controller.findOne('mock id')
      expect(mockTestMeasurementService.findOne).toBeCalled();
    })
  })

  describe('update', () => {
    it(`Should call update on the service`, async () => {
      await controller.update({ testMeasurementId: 'mock id' })
      expect(mockTestMeasurementService.update).toBeCalled();
    })
  })

  describe('remove', () => {
    it(`Should call remove on the service`, async () => {
      await controller.remove('mock id')
      expect(mockTestMeasurementService.remove).toBeCalled();
    })
  })
});
