import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/users/actions";

describe("actions", () => {
    it("creates an action to start signup", () => {
        const expectedAction = {
            type: types.START_SIGNUP
        };

        expect(actions.startSignup()).toEqual(expectedAction);
    });
});