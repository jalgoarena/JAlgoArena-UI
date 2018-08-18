export class RankingEntry {
    hacker: string;
    score: number;
    solvedProblems: Array<string>;
    region: string;
    team: string;

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