import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
