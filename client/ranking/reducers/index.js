// @flow

import * as types from "../../constants/ActionTypes";
import {RankingEntry} from "../../domain/RankingEntry";
import {ProblemRankingEntry} from "../../domain/ProblemRankingEntry";

type RankingState = {
    general: Array<RankingEntry>,
    problemRanking: Array<ProblemRankingEntry>
}

type RankingAction = {
    type: string,
    ranking?: Array<RankingEntry>,
    problemRanking?: Array<ProblemRankingEntry>
}

export function ranking(state: RankingState = {
    general: [],
    problemRanking: []
}, action: RankingAction): RankingState {
    switch (action.type) {
        case types.FETCH_RANKING:
            return Object.assign({}, state, {
                general: action.ranking
            });
        case types.FETCH_PROBLEM_RANKING:
            return Object.assign({}, state, {
                problemRanking: action.problemRanking
            });
        default:
            return state;
    }
}
