import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/common/actions/index";

jest.mock('sockjs-client');

describe("actions", () => {
    it("creates an action to clear error message", () => {
        const expectedAction = {
            type: types.RESET_ERROR_MESSAGE
        };

        expect(actions.clearErrorMessage()).toEqual(expectedAction);
    });
});