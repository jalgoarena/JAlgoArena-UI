// @flow

import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'
import Problem from "../../client/problems/domain/Problem";

let defaultState = {
    items: [],
    currentProblemId: null,
    difficultyFilter: 0,
    doneProblemsFilter: false
};

describe('problems reducer', () => {
    it('should handle FETCH_PROBLEMS_SUCCESS', () => {
        expect(
            reducer.problems(defaultState,
                {
                    type: types.FETCH_PROBLEMS_SUCCESS,
                    problems: [FIB_PROBLEM]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {items: [FIB_PROBLEM]}));

        expect(
            reducer.problems(Object.assign({}, defaultState, {
                    items: [FIB_PROBLEM]
                }),
                {
                    type: types.FETCH_PROBLEMS_SUCCESS,
                    problems: [FIB_PROBLEM, STOI_PROBLEM]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {items: [FIB_PROBLEM, STOI_PROBLEM]}));
    });

    it('should handle SET_CURRENT_PROBLEM', () => {
        expect(
            reducer.problems(defaultState,
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "fib"
                }
            )
        ).toEqual(Object.assign({}, defaultState, {currentProblemId: "fib"}));

        expect(
            reducer.problems(Object.assign({}, defaultState, {
                    currentProblemId: "fib"
                }),
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "stoi"
                }
            )
        ).toEqual(Object.assign({}, defaultState, {currentProblemId: "stoi"}));
    });

    it('should handle SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER', () => {
        expect(
            reducer.problems(defaultState,
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 1
                }
            )
        ).toEqual(Object.assign({}, defaultState, {difficultyFilter: 1}));

        expect(
            reducer.problems(Object.assign({}, defaultState, {
                    difficultyFilter: 1
                }),
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 2
                }
            )
        ).toEqual(Object.assign({}, defaultState, {difficultyFilter: 2}));
    });

    it('should handle HIDE_DONE_PROBLEMS', () => {
        expect(
            reducer.problems(defaultState,
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: true
                }
            )
        ).toEqual(Object.assign({}, defaultState, {doneProblemsFilter: true}));

        expect(
            reducer.problems(Object.assign({}, defaultState, {
                    doneProblemsFilter: true
                }),
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: false
                }
            )
        ).toEqual(defaultState);
    });
});

let FIB_PROBLEM = new Problem(
    "fib",
    "Fibonacci",
    "description",
    1,
    "dummy code",
    1
);

let STOI_PROBLEM = new Problem(
    "stoi",
    "STOI",
    "description",
    1,
    "dummy code",
    1
);
