export class JudgeResponse {
  public readonly statusCode: string;
  public readonly errorMessage: string | undefined;
  public readonly elapsedTime: number;
  public readonly consumedMemory: number;
  public readonly testcaseResults: boolean[];

  constructor(
    statusCode: string,
    errorMessage: string | undefined,
    elapsedTime: number,
    consumedMemory: number,
    testcasesResults: boolean[],
  ) {
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.elapsedTime = elapsedTime;
    this.consumedMemory = consumedMemory;
    this.testcaseResults = testcasesResults;
  }
}
