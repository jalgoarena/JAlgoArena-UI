import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes"
import * as actions from "../../client/problems/actions"
import config from "../../client/config"

import nock from "nock"
import JudgeResponse from "../../client/domain/JudgeResponse";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let judgeServerUrl = config.jalgoarenaApiUrl + "/judge/api";
let problemsServerUrl = config.jalgoarenaApiUrl + "/problems/api";

window.localStorage = {
    getItem: function (key) {
        if (key === "jwtToken")
            return "dummy_value";
        else
            throw Error("Wrong key");
    }
};

describe("async actions", () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it("creates JUDGE_RESULT_RECEIVED when judgement has been done", () => {
        let judgeResponse = new JudgeResponse(
            "ACCEPTED",
            null,
            0.24,
            0,
            [true, true, true, true, true]
        );

        nock(judgeServerUrl)
            .post("/problems/fib/submit")
            .reply(200, judgeResponse);

        const SOURCE_CODE = "dummy_source_code";
        const PROBLEM_ID = "fib";

        const expectedActions = [{
            type: types.JUDGE_RESULT_RECEIVED,
            result: judgeResponse
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.judgeCode(SOURCE_CODE, PROBLEM_ID))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_PROBLEMS_SUCCESS when fetching of problems has been done", () => {
        let problems = [
            fibProblem
        ];

        nock(judgeServerUrl)
            .get("/problems")
            .reply(200, problems);

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
            fibProblem
        ];

        nock(problemsServerUrl)
            .get("/problems")
            .reply(200, problems);

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

let fibProblem = {
    "id": "fib",
    "title": "Fibonacci",
    "description": "Write the `fib` function to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
    "timeLimit": 1,
    "memoryLimit": 32,
    "function": {
        "name": "fib",
        "return": {
            "type": "java.lang.Long",
            "comment": " N'th term of Fibonacci sequence"
        },
        "parameters": [
            {
                "name": "n",
                "type": "java.lang.Integer",
                "comment": "id of fibonacci term to be returned"
            }
        ]
    },
    "testCases": [
        {
            "input": [
                "0"
            ],
            "output": 0
        },
        {
            "input": [
                "1"
            ],
            "output": 1
        },
        {
            "input": [
                "2"
            ],
            "output": 1
        },
        {
            "input": [
                "3"
            ],
            "output": 2
        },
        {
            "input": [
                "4"
            ],
            "output": 3
        },
        {
            "input": [
                "5"
            ],
            "output": 5
        },
        {
            "input": [
                "6"
            ],
            "output": 8
        },
        {
            "input": [
                "20"
            ],
            "output": 6765
        }
    ],
    "level": 1
};
