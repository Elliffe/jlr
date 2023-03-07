import { TestMeasurementStatus } from "../enums/test-measurement-status.enum";

export class VideoCompressionFailedEvent {
  constructor(
    public readonly testMeasurementId: string,
    public readonly errorMessage: string,
    public readonly status: TestMeasurementStatus
    ) { }

  toString() {
    return JSON.stringify({
      testMeasurementId: this.testMeasurementId,
      errorMessage: this.errorMessage,
      status: this.status
    });
  }
}