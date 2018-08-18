import {StatusCode} from "../../submissions/domain/Submission";

export class Submission {
  public readonly sourceCode: string;
  public readonly userId: string;
  public readonly problemId: string;
  public readonly submissionId: string;
  public readonly statusCode: StatusCode;
  public readonly token: string | null;

  constructor(sourceCode: string, userId: string, problemId: string, submissionId: string, statusCode: StatusCode, token: string | null) {
    this.sourceCode = sourceCode;
    this.userId = userId;
    this.problemId = problemId;
    this.submissionId = submissionId;
    this.statusCode = statusCode;
    this.token = token;
  }
}
