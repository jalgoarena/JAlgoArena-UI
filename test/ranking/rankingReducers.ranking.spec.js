// @flow

import * as reducer from '../../client/ranking/reducers';
import * as types from '../../client/constants/ActionTypes';
import {RankingEntry} from "../../client/ranking/domain/RankingEntry";
import {ProblemRankingEntry} from "../../client/ranking/domain/ProblemRankingEntry";

let defaultState = {
    general: [],
    problemRanking: [],
    languages: {java: []}
};

describe('ranking reducer', () => {
    it('should handle FETCH_RANKING', () => {
        expect(
            reducer.ranking(defaultState,
                {
                    type: types.FETCH_RANKING,
                    ranking: [RANK_ENTRY_JULIA]
                }
            )
        ).toEqual({general: [RANK_ENTRY_JULIA], problemRanking: [], languages: {java: []}});

        expect(
            reducer.ranking({problemRanking: [], general: [RANK_ENTRY_JULIA], languages: {}},
                {
                    type: types.FETCH_RANKING,
                    ranking: [RANK_ENTRY_JULIA, RANK_ENTRY_MIKOLAJ]
                }
            )
        ).toEqual({general: [RANK_ENTRY_JULIA, RANK_ENTRY_MIKOLAJ], problemRanking: [], languages: {}});
    });

    it('should handle FETCH_PROBLEM_RANKING', () => {
        expect(
            reducer.ranking(defaultState,
                {
                    type: types.FETCH_PROBLEM_RANKING,
                    problemRanking: [PROBLEM_RANK_ENTRY_JULIA]
                }
            )
        ).toEqual({general: [], problemRanking: [PROBLEM_RANK_ENTRY_JULIA], languages: {java: []}});

        expect(
            reducer.ranking({problemRanking: [PROBLEM_RANK_ENTRY_JULIA], general: [], languages: {}},
                {
                    type: types.FETCH_PROBLEM_RANKING,
                    problemRanking: [PROBLEM_RANK_ENTRY_JULIA, PROBLEM_RANK_ENTRY_MIKOLAJ]
                }
            )
        ).toEqual({problemRanking: [PROBLEM_RANK_ENTRY_JULIA, PROBLEM_RANK_ENTRY_MIKOLAJ], general: [], languages: {}});
    });
});

let RANK_ENTRY_JULIA = new RankingEntry("julia", 20, [], "Kraków", "Team A");
let RANK_ENTRY_MIKOLAJ = new RankingEntry("mikolaj", 10, [], "Kraków", "Team A");

let PROBLEM_RANK_ENTRY_JULIA = new ProblemRankingEntry("julia", 20.0, 0.1, "kotlin");
let PROBLEM_RANK_ENTRY_MIKOLAJ = new ProblemRankingEntry("mikolaj", 10.0, 0.1, "java");