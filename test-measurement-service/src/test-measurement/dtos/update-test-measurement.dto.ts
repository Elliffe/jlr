import { PartialType } from '@nestjs/mapped-types';
import { CreateTestMeasurementDto } from './create-test-measurement.dto';
import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdateTestMeasurementDto extends PartialType(CreateTestMeasurementDto) {
  @IsMongoId()
  testMeasurementId: string;

  @IsString()
  @IsOptional()
  videoBlobUrl?: string;

  @IsString()
  @IsOptional()
  errorMessage?: string;
}
