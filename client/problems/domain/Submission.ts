export class Submission {
  public readonly sourceCode: string;
  public readonly userId: string;
  public readonly problemId: string;
  public readonly submissionId: string;
  public readonly token: string;

  constructor(sourceCode: string, userId: string, problemId: string, submissionId: string, token: string) {
    this.sourceCode = sourceCode;
    this.userId = userId;
    this.problemId = problemId;
    this.submissionId = submissionId;
    this.token = token;
  }
}
