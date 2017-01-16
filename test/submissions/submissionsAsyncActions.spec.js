import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/submissions/actions";
import config from "../../client/config"

import nock from "nock"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let submissionsServerUrl = config.jalgoarenaApiUrl + "/submissions/api";

window.localStorage = {
    getItem: function(key) {
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


    it("creates FETCH_SUBMISSIONS when fetching submission for a user has been done", () => {
        let submissions = [{
            problemId: "fib",
            elapsedTime: 0.123
        }];

        nock(submissionsServerUrl)
            .get("/submissions/user1")
            .reply(200, submissions);

        const expectedActions = [{
            type: types.FETCH_SUBMISSIONS,
            submissions
        }];

        const store = mockStore({submissions: []});

        return store.dispatch(actions.fetchSubmissions("user1"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_SUBMISSIONS when fetching all submissions has been done", () => {
        let submissions = [{
            problemId: "fib",
            elapsedTime: 0.123
        }];

        nock(submissionsServerUrl)
            .get("/submissions")
            .reply(200, submissions);

        const expectedActions = [{
            type: types.FETCH_SUBMISSIONS,
            submissions
        }];

        const store = mockStore({submissions: []});

        return store.dispatch(actions.fetchAllSubmissions())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SUBMISSION_SAVED when sending submissions has been done", () => {
        let submission = {
            problemId: "fib",
            elapsedTime: 0.123
        };

        nock(submissionsServerUrl)
            .put("/submissions")
            .reply(200, submission);

        const expectedActions = [{
            type: types.SUBMISSION_SAVED,
            submissions: [submission]
        }];

        const store = mockStore({submissions: []});

        let result = { elapsedTime: 0.2, sourceCode: "dummy code", statusCode: "ACCEPTED"};
        let problem = { id: "fib", level: 1};

        return store.dispatch(actions.sendSubmission(result, "user_id", problem, "kotlin"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates DELETE_SUBMISSION when deleting submissions has been done", () => {
        nock(submissionsServerUrl)
            .delete("/submissions/0-0")
            .reply(200, []);

        const expectedActions = [{
            type: types.DELETE_SUBMISSION,
            submissions: []
        }];

        const store = mockStore({submissions: []});

        return store.dispatch(actions.deleteSubmission("0-0"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});