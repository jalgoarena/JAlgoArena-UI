import * as types from "../../client/constants/ActionTypes";
import * as actions from "../../client/problems/actions";

describe("actions", () => {
    it("should create an action to start judge", () => {
        const expectedAction = {
            type: types.START_JUDGE
        };

        expect(actions.startJudge()).toEqual(expectedAction);
    });
});
