import { TestMeasurementStatus } from "../enums/test-measurement-status.enum";

export class VideoCompressedEvent {
  constructor(
    public readonly testMeasurementId: string,
    public readonly videoBlobUrl: string,
    public readonly status: TestMeasurementStatus
    ) { }

  toString() {
    return JSON.stringify({
      testMeasurementId: this.testMeasurementId,
      videoBlobUrl: this.videoBlobUrl,
      status: this.status
    });
  }
}