// @flow

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes"
import * as actions from "../../client/problems/actions"

import Method from "../../client/problems/domain/Method";
import Return from "../../client/problems/domain/Return";
import TestCase from "../../client/problems/domain/TestCase";
import Parameter from "../../client/problems/domain/Parameter";
import RawProblem from "../../client/problems/domain/RawProblem";
import Submission from "../../client/problems/domain/Submission";

jest.mock('sockjs-client');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = {
    getItem: function (key) {
        if (key === "jwtToken")
            return "dummy_value";
        else
            throw Error("Wrong key");
    }
};

describe("async actions", () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    it("creates SUBMISSION_PUBLISHED when judgement has been done", () => {
        let submission = new Submission(
            "dummy source code", "user-id", "fib", "submission-id", "token"
        );

        fetch.mockResponseOnce(JSON.stringify(submission));

        const SOURCE_CODE = "dummy_source_code";
        const PROBLEM_ID = "fib";

        const expectedActions = [{
            type: types.SUBMISSION_PUBLISHED,
            submissionId: "submission-id"
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.judgeCode(SOURCE_CODE, PROBLEM_ID, "0-0"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_PROBLEMS_SUCCESS when fetching of problems has been done", () => {
        let problems = [
            FIB_PROBLEM
        ];

        fetch.mockResponseOnce(JSON.stringify(problems));

        const expectedActions = [{
            type: types.FETCH_PROBLEMS_SUCCESS,
            problems
        }];

        const store = mockStore({problems: []});

        return store.dispatch(actions.fetchProblems())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_RAW_PROBLEMS when fetching of raw problems has been done", () => {
        let problems = [
            FIB_PROBLEM
        ];

        fetch.mockResponseOnce(JSON.stringify(problems));

        const expectedActions = [{
            type: types.FETCH_RAW_PROBLEMS,
            rawProblems: problems
        }];

        const store = mockStore({rawProblems: []});

        return store.dispatch(actions.fetchRawProblems())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});

let FIB_PROBLEM = new RawProblem(
    "fib",
    "Fibonacci",
    "Write the `fib` function to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
    1,
    new Method(
        "fib",
        new Return(
            "java.lang.Long",
            " N'th term of Fibonacci sequence"
        ),
        [
            new Parameter(
                "n",
                "java.lang.Integer",
                "id of fibonacci term to be returned"
            )
        ]
    ),
    [
        new TestCase(["0"], 0),
        new TestCase(["1"], 1),
        new TestCase(["2"], 1),
        new TestCase(["3"], 2),
        new TestCase(["4"], 3),
        new TestCase(["5"], 5),
        new TestCase(["6"], 8),
        new TestCase(["20"], 6765)
    ],
    "",
    1
);
