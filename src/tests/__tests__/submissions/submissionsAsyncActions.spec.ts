import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/submissions/actions/index";

import {fetchSolvedProblemsRatio} from "../../../client/ranking/actions";
import * as fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

jest.mock('sockjs-client');

describe("async actions", () => {
    it("creates FETCH_SUBMISSIONS when fetching user submissions has been done", () => {
        let submissions = [{
            problemId: "fib",
            elapsedTime: 0.123
        }];

        const userId = "user1";

        fetchMock.get(`/api/submissions/api/submissions/${userId}`, JSON.stringify(submissions));

        const expectedActions = [{
            type: types.FETCH_SUBMISSIONS,
            submissions
        }];

        const store = mockStore({submissions: []});

        return store.dispatch<any>(actions.fetchSubmissions(userId,  "dummy_token"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SET_ERROR_MESSAGE when fetching user submissions has failed", () => {

        const userId = "user1";

        fetchMock.get(
            `/api/submissions/api/submissions/${userId}`,
            {body: JSON.stringify({error: "bad request"}), status: 500},
            {overwriteRoutes: true, method: "GET"}
        );

        const expectedActions = [{error: "Cannot connect to Submissions Service: \"bad request\"", type: "SET_ERROR_MESSAGE"}];

        const store = mockStore();

        return store.dispatch<any>(actions.fetchSubmissions(userId, "dummy_token"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_PROBLEMS_SOLUTION_RATIO when fetching solved problems ratio has been done", () => {
        let problemPassRatio = {problemId:"fib",submissionsCount: 10};

        fetchMock.get("/api/ranking/api/solved-ratio", JSON.stringify([problemPassRatio]));

        const expectedActions = [{
            type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
            solvedProblemsRatio: [problemPassRatio]
        }];

        const store = mockStore({solvedProblemsRatio: []});

        return store.dispatch<any>(fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SET_ERROR_MESSAGE when fetching solved problems ratio has failed", () => {

        fetchMock.get(
            "/api/ranking/api/solved-ratio",
            {body: JSON.stringify({error: "bad request"}), status: 500},
            {overwriteRoutes: true, method: "GET"}
        );

        const expectedActions = [{
            type: types.SET_ERROR_MESSAGE,
            error: "Cannot connect to Ranking Service: \"bad request\""
        }];

        const store = mockStore();

        return store.dispatch<any>(fetchSolvedProblemsRatio())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});