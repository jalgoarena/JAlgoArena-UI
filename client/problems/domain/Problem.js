// @flow

export default class Problem {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    skeletonCode: string;
    level: number;

    constructor(id: string,
                title: string,
                description: string,
                timeLimit: number,
                skeletonCode: string,
                level: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timeLimit = timeLimit;
        this.skeletonCode = skeletonCode;
        this.level = level;
    }
}

