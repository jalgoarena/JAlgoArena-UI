import * as types from "../../constants/ActionTypes";

export function submissions(state = [], action) {
    switch (action.type) {
        case types.FETCH_SUBMISSIONS:
            return action.submissions;
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