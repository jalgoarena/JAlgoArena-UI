import * as types from "../../constants/ActionTypes";

export function ranking(state = {general: [], problemRanking: []}, action) {
    switch (action.type) {
        case types.FETCH_RANKING:
            return Object.assign({}, state, { general: action.ranking});
        case types.FETCH_PROBLEM_RANKING:
            return Object.assign({}, state, { problemRanking: action.problemRanking});
        default:
            return state;
    }
}
