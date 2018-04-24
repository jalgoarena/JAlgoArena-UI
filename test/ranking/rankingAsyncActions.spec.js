// @flow

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/ranking/actions";

jest.mock('sockjs-client');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
    beforeEach(() => {
        fetch.resetMocks();
    });


    it("creates FETCH_PROBLEM_RANKING when fetching of problem ranking has been done", () => {
        let problemRanking = [{
            username: "mikolaj",
            score: 20
        }];

        fetch.mockResponseOnce(JSON.stringify(problemRanking));

        const expectedActions = [{
            type: types.FETCH_PROBLEM_RANKING,
            problemRanking
        }];

        const store = mockStore({problemRanking: []});

        return store.dispatch(actions.fetchProblemRanking("fib"))
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

        fetch.mockResponseOnce(JSON.stringify(ranking));

        const expectedActions = [{
            type: types.FETCH_RANKING,
            ranking
        }];

        const store = mockStore({ranking: []});

        return store.dispatch(actions.fetchRanking())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});