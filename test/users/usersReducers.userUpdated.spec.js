import * as reducer from '../../client/users/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('userUpdated reducer', () => {
    it('should handle USER_UPDATED', () => {
        expect(
            reducer.userUpdated(null,
                {
                    type: types.USER_UPDATED,
                    userUpdated: { username: "julia" }
                }
            )
        ).toEqual({ username: "julia" });

        expect(
            reducer.userUpdated({ username: "julia" },
                {
                    type: types.USER_UPDATED,
                    userUpdated: { username: "mikolaj" }
                }
            )
        ).toEqual({ username: "mikolaj" });
    });
});