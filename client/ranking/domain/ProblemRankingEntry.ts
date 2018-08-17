export class ProblemRankingEntry {
    hacker: string;
    score: number;
    elapsedTime: number;

    constructor(
        hacker: string,
        score: number,
        elapsedTime: number
    ) {
        this.hacker = hacker;
        this.score = score;
        this.elapsedTime = elapsedTime;
    }
}