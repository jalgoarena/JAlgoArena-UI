// @flow

export default class Event {
    type: string;
    problemId: string;
    userId: string;

    constructor(type: string, problemId: string, userId: string) {
        this.type = type;
        this.problemId = problemId;
        this.userId = userId;
    }
}

