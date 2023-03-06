import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestMeasurementModule } from './test-measurement/test-measurement.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/testMeasurement'), // TODO - implement Config Service to get mongo config from env
    TestMeasurementModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
