// @flow

import * as reducer from '../../client/common/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('errorMessage reducer', () => {
    it('should handle RESET_ERROR_MESSAGE', () => {
        expect(
            reducer.errorMessage("bad request",
                {
                    type: types.RESET_ERROR_MESSAGE
                }
            )
        ).toEqual(null);
    });

    it("should handle any action with error", () => {
        expect(
            reducer.errorMessage(null,
                {
                    type: "ANY",
                    error: "bad request"
                }
            )
        ).toEqual("bad request");
    });
});