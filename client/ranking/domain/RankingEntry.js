// @flow
import {NumberOfSolutionsPerLanguageEntry} from "./NumberOfSolutionsPerLanguageEntry";

export class RankingEntry {
    hacker: string;
    score: number;
    solvedProblems: Array<string>;
    region: string;
    team: string;
    numberOfSolutionsPerLanguage: Array<NumberOfSolutionsPerLanguageEntry>;

    constructor(
        hacker: string,
        score: number,
        solvedProblems: Array<string>,
        region: string,
        team: string,
        numberOfSolutionsPerLanguage: Array<NumberOfSolutionsPerLanguageEntry>
    ) {
        this.hacker = hacker;
        this.score = score;
        this.solvedProblems = solvedProblems;
        this.region = region;
        this.team = team;
        this.numberOfSolutionsPerLanguage = numberOfSolutionsPerLanguage
    }
}