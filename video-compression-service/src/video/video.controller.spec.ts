import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoServiceFactory } from './video.service.factory';

describe('VideoController', () => {
  let controller: VideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoServiceFactory],
    }).compile();

    controller = module.get<VideoController>(VideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
