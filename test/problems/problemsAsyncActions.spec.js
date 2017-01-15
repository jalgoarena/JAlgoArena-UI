import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes"
import * as actions from "../../client/problems/actions"
import config from "../../client/config"

import nock from "nock"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it("creates JUDGE_RESULT_RECEIVED when judgement has been done", () => {
        let result = {
            "statusCode": "ACCEPTED",
            "elapsedTime": 0.24,
            "consumedMemory": 0,
            "testcaseResults": [true, true, true, true, true]
        };

        nock(config.jalgoarenaApiUrl + "/judge/api/")
            .post("/problems/fib/submit")
            .reply(200, result);

        const SOURCE_CODE = "dummy_source_code";
        const PROBLEM_ID = "fib";

        const expectedActions = [{
            type: types.JUDGE_RESULT_RECEIVED,
            result: {
                sourceCode: SOURCE_CODE,
                problemId: PROBLEM_ID,
                statusCode: "ACCEPTED",
                elapsedTime: 0.24,
                consumedMemory: 0,
                testcaseResults: [true, true, true, true, true]
            }
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.judgeCode(SOURCE_CODE, PROBLEM_ID))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    })
});

