// @flow
import TestCase from "./TestCase";
import Method from "./Method";

export default class RawProblem {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    memoryLimit: number;
    func: Method;
    testCases: Array<TestCase>;
    level: number;

    constructor(id: string,
                title: string,
                description: string,
                timeLimit: number,
                memoryLimit: number,
                func: Method,
                testCases: Array<TestCase>,
                level: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.func = func;
        this.testCases = testCases;
        this.level = level;
    }
}

