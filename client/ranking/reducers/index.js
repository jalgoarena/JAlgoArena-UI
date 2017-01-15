import * as types from "../../constants/ActionTypes";

export function ranking(state = [], action) {
    switch (action.type) {
        case types.FETCH_RANKING:
            return action.ranking;
        default:
            return state;
    }
}

export function problemRanking(state = [], action) {
    switch (action.type) {
        case types.FETCH_PROBLEM_RANKING:
            return action.problemRanking;
        default:
            return state;
    }
}