export class JudgeRequest {
  public readonly sourceCode: string;
  public readonly userId: string;

  constructor(sourceCode: string, userId: string) {
    this.sourceCode = sourceCode;
    this.userId = userId;
  }
}
