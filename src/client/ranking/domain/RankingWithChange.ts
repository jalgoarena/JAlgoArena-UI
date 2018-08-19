import {RankingEntry} from "./RankingEntry";
import * as _ from "lodash";

interface PreviousRankEntry extends RankingEntry {
    place: number
    hacker: string
    score: number
    region: string
    team: string
    solvedCount: number
}

export interface RankEntryWithChange extends PreviousRankEntry {
    change: number
}

export interface CalculateRanking {
    calculate(): Array<RankEntryWithChange>
}

export class RankingWithChange implements CalculateRanking {

    public static readonly NEW_USER = -10000;

    private readonly ranking: Array<RankingEntry>;
    private readonly previousRanking: Array<RankingEntry>;

    constructor(ranking: Array<RankingEntry>, previousRanking: Array<RankingEntry>) {
        this.ranking = ranking;
        this.previousRanking = previousRanking;
    }

    calculate(): Array<RankEntryWithChange> {
        let previousRankingData = this.calculatePreviousRanking();

        return this.ranking.map((rankEntry: RankingEntry, idx: number) => {

            let previousRankEntry =
                this.findPreviousRankEntryFor(previousRankingData, rankEntry.hacker);

            let place = idx + 1;

            let change = RankingWithChange.calculateChange(previousRankEntry, place);

            return {
                place,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length,
                change
            } as RankEntryWithChange
        });
    }

    private static calculateChange(previousRankEntry: PreviousRankEntry | undefined | null, place: number) {
        return previousRankEntry && previousRankEntry.score !== 0
            ? (previousRankEntry.place - place)
            : RankingWithChange.NEW_USER;
    }

    private findPreviousRankEntryFor(previousRankingData: Array<PreviousRankEntry>, hacker: string) {
        return _.find(previousRankingData,
            (prevRankEntry: PreviousRankEntry) => prevRankEntry.hacker === hacker
        );
    }

    private calculatePreviousRanking(): Array<PreviousRankEntry> {
        return this.previousRanking.map((rankEntry: RankingEntry, idx: number) => {
            return {
                place: idx + 1,
                hacker: rankEntry.hacker,
                score: rankEntry.score,
                region: rankEntry.region,
                team: rankEntry.team,
                solvedCount: rankEntry.solvedProblems.length
            } as PreviousRankEntry
        });
    }
}