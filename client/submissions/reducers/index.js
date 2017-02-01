import * as types from "../../constants/ActionTypes";

export function submissions(state = {
    items: [],
    statusFilter: 'ALL',
    problemsSolutionsRatio: []
}, action) {
    switch (action.type) {
        case types.FETCH_SUBMISSIONS:
        case types.DELETE_SUBMISSION:
            return Object.assign({}, state, {
                items: action.submissions
            });
        case types.SET_SUBMISSIONS_FILTER:
            return Object.assign({}, state, {
                statusFilter: action.status
            });
        case types.FETCH_PROBLEMS_SOLUTION_RATIO:
            return Object.assign({}, state, {
                problemsSolutionsRatio: action.solvedProblemsRatio
            });
        default:
            return state;
    }
}
