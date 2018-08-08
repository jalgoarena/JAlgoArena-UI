// @flow

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/common/actions";

jest.mock('sockjs-client');

describe("actions", () => {
    it("creates an action to set error message", () => {
        const expectedAction = {
            type: types.SET_ERROR_MESSAGE,
            error: "Error Message"
        };

        expect(actions.setErrorMessage("Error Message")).toEqual(expectedAction);
    });

    it("creates an action to clear error message", () => {
        const expectedAction = {
            type: types.RESET_ERROR_MESSAGE
        };

        expect(actions.clearErrorMessage()).toEqual(expectedAction);
    });
});