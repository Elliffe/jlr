import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoServiceFactory } from './video.service.factory';

@Injectable()
export class VideoServiceTestImpl extends VideoServiceFactory {

  compressVideo(videoFile: Express.Multer.File): Express.Multer.File {
    // throw new Error('Video compression failed');
    return videoFile;
  }

  createBlob(videoFile: Express.Multer.File, filename: string): string {
    const fakeVideoBlobUrl = 'https://www.blobstorage.com/fake-video';
    return fakeVideoBlobUrl;
  }
}
