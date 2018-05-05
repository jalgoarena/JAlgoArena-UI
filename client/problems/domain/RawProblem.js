// @flow
import TestCase from "./TestCase";
import Method from "./Method";

export default class RawProblem {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    func: Method;
    testCases: Array<TestCase>;
    skeletonCode: string;
    level: number;

    constructor(id: string,
                title: string,
                description: string,
                timeLimit: number,
                func: Method,
                testCases: Array<TestCase>,
                skeletonCode: string,
                level: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timeLimit = timeLimit;
        this.func = func;
        this.testCases = testCases;
        this.skeletonCode = skeletonCode;
        this.level = level;
    }
}

