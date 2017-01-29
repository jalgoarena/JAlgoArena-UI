import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/submissions/actions";
import config from "../../client/config"

import nock from "nock"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let submissionsServerUrl = config.jalgoarenaApiUrl + "/submissions/api";
// let judgeServerUrl = config.jalgoarenaApiUrl + "/judge/api";

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


    it("creates FETCH_SUBMISSIONS when fetching user submissions has been done", () => {
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

    it("creates SET_ERROR_MESSAGE when fetching user submissions has failed", () => {
        nock(submissionsServerUrl)
            .get("/submissions/user1")
            .reply(500, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Submissions Service"
        }];

        const store = mockStore();

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

    it("creates SET_ERROR_MESSAGE when fetching all submissions has failed", () => {
        nock(submissionsServerUrl)
            .get("/submissions")
            .reply(200, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Submissions Service"
        }];

        const store = mockStore();

        return store.dispatch(actions.fetchAllSubmissions())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SUBMISSION_SAVED when sending submission has been done", () => {
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
        let problem = { id: "fib"};

        return store.dispatch(actions.sendSubmission(result, "user_id", problem, "kotlin"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SET_ERROR_MESSAGE when sending submission has failed", () => {
        nock(submissionsServerUrl)
            .put("/submissions")
            .reply(500, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Submissions Service"
        }];

        const store = mockStore();

        let result = { elapsedTime: 0.2, sourceCode: "dummy code", statusCode: "ACCEPTED"};
        let problem = { id: "fib"};

        return store.dispatch(actions.sendSubmission(result, "user_id", problem, "kotlin"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates DELETE_SUBMISSION when deleting submission has been done", () => {
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

    it("creates SET_ERROR_MESSAGE when deleting submission has failed", () => {
        nock(submissionsServerUrl)
            .delete("/submissions/0-0")
            .reply(500, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Submissions Service"
        }];

        const store = mockStore();

        return store.dispatch(actions.deleteSubmission("0-0"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_SOLVED_PROBLEMS_RATIO when fetching solved problems ratio has been done", () => {
        let problemPassRatio = {problemId:"fib",submissionsCount: 10};
        nock(submissionsServerUrl)
            .get("/submissions/solved-ratio")
            .reply(200, [problemPassRatio]);

        const expectedActions = [{
            type: types.FETCH_SOLVED_PROBLEMS_RATIO,
            solvedProblemsRatio: [problemPassRatio]
        }];

        const store = mockStore({solvedProblemsRatio: []});

        return store.dispatch(actions.fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SET_ERROR_MESSAGE when fetching solved problems ratio has failed", () => {
        nock(submissionsServerUrl)
            .get("/submissions/solved-ratio")
            .reply(500, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Submissions Service"
        }];

        const store = mockStore();

        return store.dispatch(actions.fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    // TODO: think how to solve below issue - with double level dispatch nock/jest does not work :(
    // it("creates SUBMISSION_SAVED when re-submission has been done", () => {
    //     let result = { elapsedTime: 0.2, sourceCode: "dummy code", statusCode: "ACCEPTED"};
    //     let submission = {
    //         problemId: "fib",
    //         elapsedTime: 0.123
    //     };
    //
    //     nock(judgeServerUrl)
    //         .post("/problems/fib/submit")
    //         .reply(200, result);
    //
    //     nock(submissionsServerUrl)
    //         .put("/submissions")
    //         .reply(201, submission);
    //
    //     nock(submissionsServerUrl)
    //         .get("/submissions")
    //         .reply(200, [submission]);
    //
    //     const expectedActions = [{
    //         type: types.SUBMISSION_SAVED,
    //         submissions: [submission]
    //     }];
    //
    //     const store = mockStore({submissions: []});
    //
    //     return store.dispatch(actions.rerunSubmission("class Solution", "user_id", "fib", 1, "kotlin"))
    //         .then(() => {
    //             expect(store.getActions()).toEqual(expectedActions);
    //         });
    // });
});