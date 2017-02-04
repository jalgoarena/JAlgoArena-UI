// @flow

export default class JudgeResponse {
    statusCode: string;
    errorMessage: string;
    elapsedTime: number;
    consumedMemory: number;
    testcaseResults: Array<boolean>;

    constructor(statusCode: string,
                errorMessage: string,
                elapsedTime: number,
                consumedMemory: number,
                testcasesResults: Array<boolean>) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.elapsedTime = elapsedTime;
        this.consumedMemory = consumedMemory;
        this.testcaseResults = testcasesResults;
    }
}

