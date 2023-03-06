import { PartialType } from '@nestjs/mapped-types';
import { CreateTestMeasurementDto } from './create-test-measurement.dto';
import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdateTestMeasurementDto extends PartialType(CreateTestMeasurementDto) {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsOptional()
  videoBlobUrl?: string;
}
