import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/users/actions";

import config from "../../client/config"

import nock from "nock"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let authServerUrl = config.jalgoarenaApiUrl + "/auth";

window.localStorage = {
    getItem: function(key) {
        if (key === "jwtToken")
            return "dummy_value";
        else
            throw Error("Wrong key");
    }
};

window.sessionStorage = {
    removeItem: function (key) {
    }
};

describe("async actions", () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it("creates SIGNUP_SUCCESS when sign up has been done", () => {
        nock(authServerUrl)
            .post("/signup")
            .reply(200, "{}");

        const expectedActions = [{
            type: types.SIGNUP_SUCCESS
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.attemptSignUp("email", "password", "username", "region", "team"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});