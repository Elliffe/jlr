export class TestMeasurementCreatedEvent {
  constructor(public readonly testMeasurement: any) { }

  toString() {
    return JSON.stringify({
      testMeasurement: this.testMeasurement
    });
  }
}