export class Submission {
  public readonly problemId: string;
  public readonly elapsedTime: number;
  public readonly sourceCode: string;
  public readonly statusCode: string;
  public readonly userId: string;
  public readonly submissionId: string;
  public readonly submissionTime: Date;
  public readonly consumedMemory: number;
  public readonly passedTestCases: number;
  public readonly failedTestCases: number;
  public readonly errorMessage: string | null;
  public readonly id: string | null;

  constructor(
    problemId: string,
    elapsedTime: number,
    sourceCode: string,
    statusCode: string,
    userId: string,
    submissionId: string,
    submissionTime: Date,
    consumedMemory: number,
    passedTestCases: number,
    failedTestCases: number,
    errorMessage: string | null,
    id: string | null,
  ) {
    this.problemId = problemId;
    this.elapsedTime = elapsedTime;
    this.sourceCode = sourceCode;
    this.statusCode = statusCode;
    this.userId = userId;
    this.submissionId = submissionId;
    this.submissionTime = submissionTime;
    this.consumedMemory = consumedMemory;
    this.passedTestCases = passedTestCases;
    this.failedTestCases = failedTestCases;
    this.errorMessage = errorMessage;
    this.id = id;
  }
}
