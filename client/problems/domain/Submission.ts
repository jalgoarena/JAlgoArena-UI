// @flow

export default class Submission {
    sourceCode: string;
    userId: string;
    problemId: string;
    submissionId: string;
    token: string;

    constructor(sourceCode: string,
                userId: string,
                problemId: string,
                submissionId: string,
                token: string) {
        this.sourceCode = sourceCode;
        this.userId = userId;
        this.problemId = problemId;
        this.submissionId = submissionId;
        this.token = token;
    }
}