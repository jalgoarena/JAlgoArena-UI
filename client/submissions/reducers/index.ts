// @flow

import * as types from "../../constants/ActionTypes";
import {Submission} from "../domain/Submission";
import {ProblemSubmissionRatio} from "../domain/ProblemSubmissionRatio";

export interface SubmissionsState {
    items: Array<Submission>
    statusFilter: string
    problemsSolutionsRatio: Array<ProblemSubmissionRatio>
    stats: Array<{}>
}

type SubmissionsAction = {
    type: string,
    submissions?: Array<Submission>,
    status?: string,
    solvedProblemsRatio?: Array<ProblemSubmissionRatio>,
    stats?: Array<{}>
}

export function submissions(state: SubmissionsState = {
    items: [],
    statusFilter: 'ALL',
    problemsSolutionsRatio: [],
    stats: []
}, action: SubmissionsAction): SubmissionsState {
    switch (action.type) {
        case types.FETCH_SUBMISSIONS:
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
        case types.FETCH_SUBMISSIONS_STATS:
            return Object.assign({}, state, {
                stats: action.stats
            });
        default:
            return state;
    }
}
