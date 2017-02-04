// @flow

export default class Problem {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    memoryLimit: number;
    skeletonCode: Map<string, string>;
    level: number;

    constructor(id: string,
                title: string,
                description: string,
                timeLimit: number,
                memoryLimit: number,
                skeletonCode: Map<string, string>,
                level: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.skeletonCode = skeletonCode;
        this.level = level;
    }
}

