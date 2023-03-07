export class CompressVideoEvent {
  constructor(
    public readonly testMeasurementId: string,
    public readonly videoFile: Express.Multer.File
    ) { }

  toString() {
    return JSON.stringify({
      testMeasurementId: this.testMeasurementId,
      videoFile: this.videoFile
    });
  }
}