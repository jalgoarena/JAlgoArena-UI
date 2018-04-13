// @flow

import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/submissions/actions";

window.localStorage = {
    getItem: function() {
        return null;
    }
};

describe("actions", () => {
    it("creates an action to set submissions filter", () => {
        let status = "ACCEPTED";

        const expectedAction = {
            type: types.SET_SUBMISSIONS_FILTER,
            status
        };

        expect(actions.setSubmissionsFilter(status)).toEqual(expectedAction);
    });

    it("fetchSubmissions do nothing if token is absent", () => {
        const expectedAction = null;

        expect(actions.fetchSubmissions("dummy_user")).toEqual(expectedAction);
    });
});