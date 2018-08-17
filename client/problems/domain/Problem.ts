export default class Problem {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly timeLimit: number;
  public readonly skeletonCode: string;
  public readonly level: number;

  constructor(id: string, title: string, description: string, timeLimit: number, skeletonCode: string, level: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timeLimit = timeLimit;
    this.skeletonCode = skeletonCode;
    this.level = level;
  }
}
