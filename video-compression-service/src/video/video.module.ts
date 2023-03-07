import { Module } from '@nestjs/common';
import { VideoServiceFactory } from './video.service.factory';
import { VideoController } from './video.controller';
import { VideoServiceTestImpl } from './test-video.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_MEASUREMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test-measurement',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'test-measurement-consumer'
          }
        }
      }
    ])
  ],
  controllers: [VideoController],
  providers: [
    {
      provide: VideoServiceFactory,
      useClass: VideoServiceTestImpl
    }
  ]
})
export class VideoModule {}
