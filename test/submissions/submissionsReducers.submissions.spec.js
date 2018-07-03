// @flow

import * as reducer from '../../client/submissions/reducers';
import * as types from '../../client/constants/ActionTypes';
import {Submission} from "../../client/submissions/domain/Submission";
import {ProblemSubmissionRatio} from "../../client/submissions/domain/ProblemSubmissionRatio";

let defaultState = {
    items: [],
    statusFilter: 'ALL',
    problemsSolutionsRatio: []
};

let SUBMISSION_JULIA = new Submission("fib", 0.01, "class Dummy", "ACCEPTED", "0-0", "1", "2018-04-05", 0, 1, 0);
let SUBMISSION_MIKOLAJ = new Submission("fib", 0.01, "class Dummy", "ACCEPTED", "0-1", "2", "2018-04-05", 0, 1, 0);
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