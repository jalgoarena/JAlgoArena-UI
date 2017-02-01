import * as types from "../../constants/ActionTypes";

export function submissions(state = { items: [] }, action) {
    switch (action.type) {
        case types.FETCH_SUBMISSIONS:
        case types.DELETE_SUBMISSION:
            return Object.assign({}, state, { items: action.submissions});
        default:
            return state;
    }
}

export function submissionsFilter(state = 'ALL', action) {
    switch (action.type) {
        case types.SET_SUBMISSIONS_FILTER:
            return action.status;
        default:
            return state;
    }
}

export function solvedProblemsRatio(state = [], action) {
    switch (action.type) {
        case types.FETCH_SOLVED_PROBLEMS_RATIO:
            return action.solvedProblemsRatio;
        default:
            return state;
    }
}