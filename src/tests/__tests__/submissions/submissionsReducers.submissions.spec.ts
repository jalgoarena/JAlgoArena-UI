import * as reducer from '../../../client/submissions/reducers/index';
import * as types from '../../../client/constants/ActionTypes';
import {Submission} from "../../../client/submissions/domain/Submission";
import {ProblemSubmissionRatio} from "../../../client/submissions/domain/ProblemSubmissionRatio";
import {StatusCode} from "../../../client/submissions/domain/StatusCode";

let defaultState = {
    items: [],
    statusFilter: 'ALL',
    problemsSolutionsRatio: [],
    stats: []
};

let SUBMISSION_JULIA = new Submission("fib", 0.01, "class Dummy", StatusCode.Accepted, "0-0", "1", new Date(Date.now()), 0, 1, 0, null, "1");
let SUBMISSION_MIKOLAJ = new Submission("fib", 0.01, "class Dummy", StatusCode.Accepted, "0-1", "2", new Date(Date.now()), 0, 1, 0, null, "2");
let PROBLEM_SUBMISSION_RATIO = new ProblemSubmissionRatio("fib", 4);

describe('ranking reducer', () => {
    it('should handle FETCH_SUBMISSIONS', () => {
        expect(
            reducer.submissions(defaultState,
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [SUBMISSION_JULIA]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {items: [SUBMISSION_JULIA]}));

        expect(
            reducer.submissions(Object.assign({}, defaultState, {
                    items: [SUBMISSION_JULIA]
                }),
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [SUBMISSION_JULIA, SUBMISSION_MIKOLAJ]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {items: [SUBMISSION_JULIA, SUBMISSION_MIKOLAJ]}));
    });

    it('should handle SET_SUBMISSIONS_FILTER', () => {
        expect(
            reducer.submissions(defaultState,
                {
                    type: types.SET_SUBMISSIONS_FILTER,
                    status: "ACCEPTED"
                }
            )
        ).toEqual(Object.assign({}, defaultState, {statusFilter: "ACCEPTED"}));
    });

    it('should handle FETCH_PROBLEMS_SOLUTION_RATIO', () => {
        expect(
            reducer.submissions(defaultState,
                {
                    type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
                    solvedProblemsRatio: [PROBLEM_SUBMISSION_RATIO]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {problemsSolutionsRatio: [PROBLEM_SUBMISSION_RATIO]}));
    });
});