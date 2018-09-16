export class ProblemRankingEntry {
    public readonly hacker: string;
    public readonly score: number;
    public readonly elapsedTime: number;

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