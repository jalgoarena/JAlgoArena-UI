// @flow

import * as types from "../../../client/constants/ActionTypes";
import * as actions from "../../../client/submissions/actions/index";

jest.mock('sockjs-client');

describe("actions", () => {
    it("creates an action to set submissions filter", () => {
        let status = "ACCEPTED";

        const expectedAction = {
            type: types.SET_SUBMISSIONS_FILTER,
            status
        };

        expect(actions.setSubmissionsFilter(status)).toEqual(expectedAction);
    });
});