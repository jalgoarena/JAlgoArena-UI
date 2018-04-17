// @flow

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/submissions/actions";
import config from "../config"

import nock from "nock"
import {fetchSolvedProblemsRatio} from "../../client/ranking/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let submissionsServerUrl = config.jalgoarenaApiUrl + "/submissions/api";
let rankingServerUrl = config.jalgoarenaApiUrl + "/ranking/api";

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

    it("creates FETCH_PROBLEMS_SOLUTION_RATIO when fetching solved problems ratio has been done", () => {
        let problemPassRatio = {problemId:"fib",submissionsCount: 10};
        nock(rankingServerUrl)
            .get("/solved-ratio")
            .reply(200, [problemPassRatio]);

        const expectedActions = [{
            type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
            solvedProblemsRatio: [problemPassRatio]
        }];

        const store = mockStore({solvedProblemsRatio: []});

        return store.dispatch(fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SET_ERROR_MESSAGE when fetching solved problems ratio has failed", () => {
        nock(rankingServerUrl)
            .get("/solved-ratio")
            .reply(500, {error: "bad request"});

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Ranking Service"
        }];

        const store = mockStore();

        return store.dispatch(fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});