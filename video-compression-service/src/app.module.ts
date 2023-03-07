import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
