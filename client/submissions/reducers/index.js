// @flow

import * as types from "../../constants/ActionTypes";
import {Submission} from "../domain/Submission";
import {ProblemSubmissionRatio} from "../domain/ProblemSubmissionRatio";

type SubmissionsState = {
    items: Array<Submission>,
    statusFilter: string,
    problemsSolutionsRatio: Array<ProblemSubmissionRatio>
}

type SubmissionsAction = {
    type: string,
    submissions?: Array<Submission>,
    status?: string,
    solvedProblemsRatio?: Array<ProblemSubmissionRatio>
}

export function submissions(state: SubmissionsState = {
    items: [],
    statusFilter: 'ALL',
    problemsSolutionsRatio: []
}, action: SubmissionsAction): SubmissionsState {
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
