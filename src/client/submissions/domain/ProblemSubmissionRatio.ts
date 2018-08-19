export class ProblemSubmissionRatio {
    public readonly problemId: string;
    public readonly solutionsCount: number;

    constructor(problemId: string,
                solutionsCount: number) {
        this.problemId = problemId;
        this.solutionsCount = solutionsCount;
    }
}
