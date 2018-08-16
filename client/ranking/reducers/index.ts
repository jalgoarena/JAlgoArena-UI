// @flow

import * as types from "../../constants/ActionTypes";
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";

type RankingState = {
    general: Array<RankingEntry>,
    previousRanking: Array<RankingEntry>,
    problemRanking: Array<ProblemRankingEntry>,
    startDate: string,
    refreshInProgress: boolean
}

type RankingAction = {
    type: string,
    ranking?: Array<RankingEntry>,
    previousRanking?: Array<RankingEntry>,
    problemRanking?: Array<ProblemRankingEntry>,
    startDate?: string,
    refreshInProgress?: boolean
}

export function ranking(state: RankingState = {
    general: [],
    previousRanking: [],
    problemRanking: [],
    startDate: '2018-08-01',
    refreshInProgress: false
}, action: RankingAction): RankingState {
    switch (action.type) {
        case types.FETCH_RANKING:
            return Object.assign({}, state, {
                general: action.ranking
            });
        case types.FETCH_PREVIOUS_RANKING:
            return Object.assign({}, state, {
                previousRanking: action.previousRanking
            });
        case types.FETCH_PROBLEM_RANKING:
            return Object.assign({}, state, {
                problemRanking: action.problemRanking
            });
        case types.FETCH_RANKING_START_DATE:
            return Object.assign({}, state, {
                startDate: action.startDate
            });
        case types.START_RANKING_REFRESH:
            return Object.assign({}, state, {
                refreshInProgress: true
            });
        case types.RANKING_REFRESH_FINISHED:
            return Object.assign({}, state, {
                refreshInProgress: false
            });
        default:
            return state;
    }
}
