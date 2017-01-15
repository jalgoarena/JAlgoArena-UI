import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/users/actions";

window.localStorage = {
    removeItem: function (key) {
        if (key !== "jwtToken") {
            throw Error("Wrong key");
        }
    },
    getItem: function (key) {
        if (key === "jwtToken")
            return "dummy_value";
        else
            throw Error("Wrong key");
    },
};

describe("actions", () => {
    it("creates an action to start signup", () => {
        const expectedAction = {
            type: types.START_SIGNUP
        };

        expect(actions.startSignup()).toEqual(expectedAction);
    });

    it("creates an action to start login", () => {
        const expectedAction = {
            type: types.START_LOGIN
        };

        expect(actions.startLogin()).toEqual(expectedAction);
    });

    it("creates an action to logout", () => {
        const expectedAction = {
            type: types.LOGOUT_SUCCESS
        };

        expect(actions.attemptLogout()).toEqual(expectedAction);
    });

    it("creates an action to navigate away from auth form page", () => {
        const expectedAction = {
            type: types.NAVIGATE_AWAY_FROM_AUTH_FORM
        };

        expect(actions.navigatedAwayFromAuthFormPage()).toEqual(expectedAction);
    });
});