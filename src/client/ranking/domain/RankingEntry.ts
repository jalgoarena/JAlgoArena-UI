export class RankingEntry {
    public readonly hacker: string;
    public readonly score: number;
    public readonly solvedProblems: Array<string>;
    public readonly region: string;
    public readonly team: string;

    constructor(
        hacker: string,
        score: number,
        solvedProblems: Array<string>,
        region: string,
        team: string,
    ) {
        this.hacker = hacker;
        this.score = score;
        this.solvedProblems = solvedProblems;
        this.region = region;
        this.team = team;
    }
}