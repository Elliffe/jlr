import { IsNotEmpty } from 'class-validator';

export class CreateTestMeasurementDto {
  @IsNotEmpty()
  testMeasurement: any;
}
