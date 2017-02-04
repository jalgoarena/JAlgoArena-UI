// @flow

export default class JudgeRequest {
    sourceCode: string;
    userId: string;
    language: string;

    constructor(sourceCode: string,
                userId: string,
                language: string) {
        this.sourceCode = sourceCode;
        this.userId = userId;
        this.language = language;
    }
}

