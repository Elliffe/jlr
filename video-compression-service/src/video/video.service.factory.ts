import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class VideoServiceFactory {
  abstract compressVideo(videoFile: Express.Multer.File): Express.Multer.File;
  abstract createBlob(videoFile: Express.Multer.File, filename: string): string;
}
