// @flow

export class Submission {
    problemId: string;
    elapsedTime: number;
    sourceCode: string;
    statusCode: string;
    userId: string;
    language: string;
    id: ?string;

    constructor(problemId: string,
                elapsedTime: number,
                sourceCode: string,
                statusCode: string,
                userId: string,
                language: string,
                id: ?string) {
        this.problemId = problemId;
        this.elapsedTime = elapsedTime;
        this.sourceCode = sourceCode;
        this.statusCode = statusCode;
        this.userId = userId;
        this.language = language;
        this.id = id;
    }
}
