import {RankingWithChange} from "../../../client/ranking/domain/RankingWithChange";
import {RankingEntry} from "../../../client/ranking/domain/RankingEntry";

describe("Calculate Ranking", () => {
    let ranking = [
        new RankingEntry("madzia", 15, ["fib", "find-middle-item"], "Krakow", "Team B"),
        new RankingEntry("jacek", 10, ["fib"], "Krakow", "Team A"),
        new RankingEntry("julia", 10, ["fib"], "Wrocław", "Team C"),
        new RankingEntry("mikolaj", 10, ["fib"], "Wrocław", "Team C"),
        new RankingEntry("greg", 5, ["find-middle-item", "fib"], "Wrocław", "Team C"),
        new RankingEntry("tom", 5, ["find-middle-item"], "Wrocław", "Team C")
    ];

    let previousRanking = [
        new RankingEntry("jacek", 10, ["fib"], "Krakow", "Team A"),
        new RankingEntry("madzia", 5, ["find-middle-item"], "Krakow", "Team B")
    ];

    it("creates ranking with new users if previous rank is empty", () => {
        let rankingData = new RankingWithChange(ranking, []).calculate();

        rankingData.forEach(item =>
            expect(item.change).toBe(RankingWithChange.NEW_USER)
        );
    });

    it("creates ranking with changes if ranking has changed", () => {
        let rankingData = new RankingWithChange(ranking, previousRanking).calculate();

        expect(rankingData[0].change).toBe(1);
        expect(rankingData[1].change).toBe(-1);
    });

    it("creates unchanged ranking if no ranking changes", () => {
       let rankingData = new RankingWithChange(ranking, ranking).calculate();

        expect(rankingData[0].change).toBe(0);
        expect(rankingData[1].change).toBe(0);
    });

    it("calculates amount of solved problems", () => {
        let rankingData = new RankingWithChange(ranking, previousRanking).calculate();

        expect(rankingData[0].solvedCount).toBe(2);
        expect(rankingData[1].solvedCount).toBe(1);
    });

    it("displays place based on index", () => {
        let rankingData = new RankingWithChange(ranking, previousRanking).calculate();

        expect(rankingData[0].place).toBe(1);
        expect(rankingData[1].place).toBe(2);
    });
});