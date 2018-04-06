// @flow

export class Submission {
    problemId: string;
    elapsedTime: number;
    sourceCode: string;
    statusCode: string;
    userId: string;
    language: string;
    submissionId: string;
    consumedMemory: number;
    passedTestCases: number;
    failedTestCases: number;
    errorMessage: ?string;
    id: ?string;

    constructor(problemId: string,
                elapsedTime: number,
                sourceCode: string,
                statusCode: string,
                userId: string,
                language: string,
                submissionId: string,
                consumedMemory: number,
                passedTestCases: number,
                failedTestCases: number,
                errorMessage: ?string,
                id: ?string) {
        this.problemId = problemId;
        this.elapsedTime = elapsedTime;
        this.sourceCode = sourceCode;
        this.statusCode = statusCode;
        this.userId = userId;
        this.language = language;
        this.submissionId = submissionId;
        this.consumedMemory = consumedMemory;
        this.passedTestCases = passedTestCases;
        this.failedTestCases = failedTestCases;
        this.errorMessage = errorMessage;
        this.id = id;
    }
}
