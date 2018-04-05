// @flow

export default class Submission {
    sourceCode: string;
    userId: string;
    language: string;
    problemId: string;
    submissionId: string;
    token: string;

    constructor(sourceCode: string,
                userId: string,
                language: string,
                problemId: string,
                submissionId: string,
                token: string) {
        this.sourceCode = sourceCode;
        this.userId = userId;
        this.language = language;
        this.problemId = problemId;
        this.submissionId = submissionId;
        this.token = token;
    }
}