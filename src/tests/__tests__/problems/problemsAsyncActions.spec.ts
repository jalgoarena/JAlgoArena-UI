import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../../client/constants/ActionTypes"
import * as actions from "../../../client/problems/actions/index"

import {Submission} from "../../../client/problems/domain/Submission";
import Problem from "../../../client/problems/domain/Problem";
import * as fetchMock from "fetch-mock";
import {StatusCode} from "../../../client/submissions/domain/StatusCode";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
    it("creates SUBMISSION_PUBLISHED when judgement has been done", () => {
        let submission = new Submission(
            "dummy source code", "user-id", "fib", "submission-id", StatusCode.Accepted, "token"
        );

        fetchMock.post(`/api/queue/api/problems/${submission.problemId}/publish`, JSON.stringify(submission));

        const SOURCE_CODE = "dummy_source_code";
        const PROBLEM_ID = "fib";

        const expectedActions = [{
            type: types.SUBMISSION_PUBLISHED,
            submissionId: "submission-id"
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch<any>(actions.judgeCode(SOURCE_CODE, PROBLEM_ID, "0-0", "dummy_token"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_PROBLEMS_SUCCESS when fetching of problems has been done", () => {
        let problems = [
            FIB_PROBLEM
        ];

        fetchMock.get(`/api/judge/api/problems`, JSON.stringify(problems));

        const expectedActions = [{
            type: types.FETCH_PROBLEMS_SUCCESS,
            problems
        }];

        const store = mockStore({problems: []});

        return store.dispatch<any>(actions.fetchProblems())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});

let FIB_PROBLEM = new Problem(
    "fib",
    "Fibonacci",
    "Write the `fib` function to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
    1,
    "",
    1
);
