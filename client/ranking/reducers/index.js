// @flow

import * as types from "../../constants/ActionTypes";
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";

type RankingState = {
    general: Array<RankingEntry>,
    problemRanking: Array<ProblemRankingEntry>
}

type RankingAction = {
    type: string,
    ranking?: Array<RankingEntry>,
    problemRanking?: Array<ProblemRankingEntry>,
    startDate?: string
}

export function ranking(state: RankingState = {
    general: [],
    problemRanking: [],
    startDate: '2018-08-01'
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
        case types.FETCH_RANKING_START_DATE:
            return Object.assign({}, state, {
                startDate: action.startDate
            });
        default:
            return state;
    }
}
