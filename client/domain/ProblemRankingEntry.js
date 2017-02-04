// @flow

export class ProblemRankingEntry {
    hacker: string;
    score: number;
    elapsedTime: number;
    language: string;

    constructor(
        hacker: string,
        score: number,
        elapsedTime: number,
        language: string
    ) {
        this.hacker = hacker;
        this.score = score;
        this.elapsedTime = elapsedTime;
        this.language = language;
    }
}