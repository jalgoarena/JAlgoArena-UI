// @flow

export class ProblemSubmissionRatio {
    problemId: string;
    solutionsCount: number;

    constructor(problemId: string,
                solutionsCount: number) {
        this.problemId = problemId;
        this.solutionsCount = solutionsCount;
    }
}
