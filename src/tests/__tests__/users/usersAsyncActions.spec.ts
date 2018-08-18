import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/users/actions/index";
import * as fetchMock from "fetch-mock";

// jest.mock('sockjs-client');

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

// window.localStorage = {
//     getItem: function (key) {
//         if (key === "jwtToken")
//             return "dummy_value";
//         else
//             throw Error("Wrong key");
//     },
//     setItem: function (key) {
//         if (key !== 'jwtToken')
//             throw Error("Wrong key");
//     }
// };

describe("async actions", () => {
    it("creates SIGNUP_FAIL when sign up has been failed", () => {
        let errorMessage = {
            error: "Registration Error",
            message: "Username is already used"
        };

        fetchMock.post(`/api/auth/signup`, {body: JSON.stringify(errorMessage), status: 409});

        const expectedActions = [{
            type: types.SIGNUP_FAIL,
            error: errorMessage.message
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch<any>(actions.attemptSignUp(
            "email", "password", "username", "region", "team", "first name", "surname"
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates LOGIN_SUCCESS when log in has been succeed", () => {
        let user = {username: "user"};

        fetchMock.post(`/api/auth/login`, JSON.stringify({token: "1234567", user}));

        const expectedActions = [{
            type: types.LOGIN_SUCCESS,
            user
        }];

        const store = mockStore({user: {}});

        return store.dispatch<any>(actions.attemptLogin("username", "password"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates LOGIN_FAIL when log in has been failed", () => {
        let errorMessage = {error: "Forbidden", message: "Access Denied"};

        fetchMock.post(
            `/api/auth/login`,
            {body: JSON.stringify(errorMessage), status: 403},
            {overwriteRoutes: true, method: "POST"}
        );

        const expectedActions = [{
            type: types.LOGIN_FAIL,
            error: errorMessage.message
        }];

        const store = mockStore({error: {}});

        return store.dispatch<any>(actions.attemptLogin("username", "password"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates CHECKED_SESSION_STATUS when session check has been successful", () => {
        let user = {username: "user", id: "0-0"};
        let submission = {submissionId: "1"};

        fetchMock.get(`/api/auth/api/user`, JSON.stringify(user));
        fetchMock.get(`/api/submissions/api/submissions/${user.id}`, JSON.stringify([submission]));

        const expectedActions = [{
            type: types.CHECKED_SESSION_STATUS,
            user
        }];

        const store = mockStore({user: {}});

        return store.dispatch<any>(actions.checkSessionStatus())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_USERS when users has been successfully downloaded", () => {
        let user = {username: "user"};

        fetchMock.get(`/api/auth/users`, JSON.stringify([user]));

        const expectedActions = [{
            type: types.FETCH_USERS,
            users: [user]
        }];

        const store = mockStore({users: []});

        return store.dispatch<any>(actions.fetchUsers())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});