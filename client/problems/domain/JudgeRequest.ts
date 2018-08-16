// @flow

export default class JudgeRequest {
    sourceCode: string;
    userId: string;

    constructor(sourceCode: string,
                userId: string) {
        this.sourceCode = sourceCode;
        this.userId = userId;
    }
}

