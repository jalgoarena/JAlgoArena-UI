// @flow

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/users/actions";

import User from "../../client/users/domain/User";

jest.mock('sockjs-client');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = {
    getItem: function (key) {
        if (key === "jwtToken")
            return "dummy_value";
        else
            throw Error("Wrong key");
    },
    setItem: function(key, value) {
        if (key !== 'jwtToken')
            throw Error("Wrong key");
    }
};

window.sessionStorage = {
    removeItem: function (key) {
    }
};

describe("async actions", () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    it("creates SIGNUP_SUCCESS when sign up has been done", () => {
        fetch.mockResponseOnce(JSON.stringify({}));

        const expectedActions = [{
            type: types.SIGNUP_SUCCESS
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.attemptSignUp("email", "password", "username", "region", "team"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates SIGNUP_FAIL when sign up has been failed", () => {
        let errorMessage = {
            error: "Registration Error",
            message: "Username is already used"
        };

        fetch.mockResponseOnce(
            JSON.stringify(errorMessage),
            { status: 409 }
        );

        const expectedActions = [{
            type: types.SIGNUP_FAIL,
            error: errorMessage
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.attemptSignUp("email", "password", "username", "region", "team"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates LOGIN_SUCCESS when log in has been succeed", () => {
        let user = { username: "user"};

        fetch.mockResponseOnce(JSON.stringify({ token: "1234567", user}));

        const expectedActions = [{
            type: types.LOGIN_SUCCESS,
            user
        }];

        const store = mockStore({user: {}});

        return store.dispatch(actions.attemptLogin("username", "password"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates LOGIN_FAIL when log in has been failed", () => {
        let errorMessage = { error: "Forbidden", message: "Access Denied"};

        fetch.mockResponseOnce(
            JSON.stringify(errorMessage),
            { status: 403 }
        );

        const expectedActions = [{
            type: types.LOGIN_FAIL,
            error: errorMessage
        }];

        const store = mockStore({error: {}});

        return store.dispatch(actions.attemptLogin("username", "password"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates CHECKED_SESSION_STATUS when session check has been successful", () => {
        let user = { username: "user"};
        let submission = {submissionId: "1"};

        fetch
            .once(JSON.stringify(user))
            .once(JSON.stringify([submission]));

        const expectedActions = [{
            type: types.CHECKED_SESSION_STATUS,
            user
        }];

        const store = mockStore({user: {}});

        return store.dispatch(actions.checkSessionStatus())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_USERS when users has been successfully downloaded", () => {
        let user = { username: "user"};

        fetch.mockResponseOnce(JSON.stringify([user]));

        const expectedActions = [{
            type: types.FETCH_USERS,
            users: [user]
        }];

        const store = mockStore({users: []});

        return store.dispatch(actions.fetchUsers())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates USER_UPDATED when updating user has been done", () => {
        let user = new User(
            "username", "password", "email", "region", "team"
        );

        fetch
            .once(JSON.stringify(user))
            .once(JSON.stringify([user]));

        const expectedActions = [{
            type: types.USER_UPDATED,
            userUpdated: user
        }];

        const store = mockStore({userUpdated: null});

        return store.dispatch(actions.updateUser(user))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});