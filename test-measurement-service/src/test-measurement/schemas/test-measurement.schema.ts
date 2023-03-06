import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TestMeasurementStatus } from '../../enums/test-measurement-status.enum';

export type TestMeasurementDocument = HydratedDocument<TestMeasurement>;

@Schema({ timestamps: true })
export class TestMeasurement {
  @Prop({ required: true, type: Object })
  testMeasurement: any;

  @Prop({ required: false })
  videoBlobUrl: string;

  @Prop({ type: String, enum: TestMeasurementStatus, default: TestMeasurementStatus.PROCESSING })
  status: TestMeasurementStatus;
}

export const TestMeasurementSchema = SchemaFactory.createForClass(TestMeasurement);
TestMeasurementSchema.set('collection', 'TestMeasurements');

TestMeasurementSchema.set('toJSON', { virtuals: true });
TestMeasurementSchema.set('toObject', { virtuals: true });

TestMeasurementSchema.virtual('id').get(function () {
  return this._id.toHexString()
});

TestMeasurementSchema.pre<TestMeasurementDocument>('validate', function (next) {
  if (this.status === TestMeasurementStatus.COMPLETE) {
    try {
      new URL(this.videoBlobUrl); // will throw if url is invalid. 
    } catch (err) {
      next(new Error('videoBlobUrl must be provided'));
    }
  } else {
    next();
  }
});

TestMeasurementSchema.pre<TestMeasurementDocument>('save', function (next) {
  next();
});