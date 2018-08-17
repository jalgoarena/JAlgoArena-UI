export class Event {
  public readonly type: string;
  public readonly problemId: string;
  public readonly userId: string;

  constructor(type: string, problemId: string, userId: string) {
    this.type = type;
    this.problemId = problemId;
    this.userId = userId;
  }
}
