import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/ranking/actions/index";
import * as fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {

    it("creates FETCH_PROBLEM_RANKING when fetching of problem ranking has been done", () => {
        let problemRanking = [{
            username: "mikolaj",
            score: 20
        }];

        const problemId = "fib";

        fetchMock.get(`/api/ranking/api/ranking/problem/${problemId}`, JSON.stringify(problemRanking));

        const expectedActions = [{
            type: types.FETCH_PROBLEM_RANKING,
            problemRanking
        }];

        const store = mockStore({problemRanking: []});

        return store.dispatch<any>(actions.fetchProblemRanking(problemId))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_RANKING when fetching of ranking has been done", () => {
        let ranking = [{
            username: "mikolaj",
            score: 20
        }, {
            username: "julia",
            score: 20
        }];

        fetchMock.get(`/api/ranking/api/ranking`, JSON.stringify(ranking));

        const expectedActions = [{
            type: types.FETCH_RANKING,
            ranking
        }];

        const store = mockStore({ranking: []});

        return store.dispatch<any>(actions.fetchRanking())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});