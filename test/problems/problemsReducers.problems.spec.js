// @flow

import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'
import Problem from "../../client/problems/domain/Problem";
import RawProblem from "../../client/problems/domain/RawProblem";
import Method from "../../client/problems/domain/Method";
import Return from "../../client/problems/domain/Return";
import Parameter from "../../client/problems/domain/Parameter";
import TestCase from "../../client/problems/domain/TestCase";

let defaultState = {
    items: [],
    currentProblemId: null,
    difficultyFilter: 0,
    doneProblemsFilter: false,
    rawItems: []
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

    it('should handle CHANGE_PROGRAMMING_LANGUAGE', () => {
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

    it('should handle FETCH_RAW_PROBLEMS', () => {
        expect(
            reducer.problems(defaultState,
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [FIB_RAW_PROBLEM]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {rawItems: [FIB_RAW_PROBLEM]}));

        expect(
            reducer.problems(Object.assign({}, defaultState, {
                    rawItems: [FIB_RAW_PROBLEM]
                }),
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [FIB_RAW_PROBLEM, STOI_RAW_PROBLEM]
                }
            )
        ).toEqual(Object.assign({}, defaultState, {rawItems: [FIB_RAW_PROBLEM, STOI_RAW_PROBLEM]}));
    });
});

let FIB_PROBLEM = new Problem(
    "fib",
    "Fibonacci",
    "description",
    1,
    32,
    {"java": "dummy code"},
    1
);

let STOI_PROBLEM = new Problem(
    "stoi",
    "STOI",
    "description",
    1,
    32,
    {"java": "dummy code"},
    1
);

let FIB_RAW_PROBLEM = new RawProblem(
    "fib",
    "Fibonacci",
    "description",
    1,
    32,
    new Method(
        "fib",
        new Return("java.lang.Integer", "Comment"),
        [new Parameter("n", "java.lang.Integer", "Comment")]
    ),
    [new TestCase(["0"], 0)],
    1
);

let STOI_RAW_PROBLEM = new RawProblem(
    "stoi",
    "STOI",
    "description",
    1,
    32,
    new Method(
        "stoi",
        new Return("java.lang.Integer", "Comment"),
        [new Parameter("n", "java.lang.Integer", "Comment")]
    ),
    [new TestCase(["0"], 0)],
    1
);