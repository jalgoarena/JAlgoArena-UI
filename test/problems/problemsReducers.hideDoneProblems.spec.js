import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('hideDoneProblems reducer', () => {
    it('should handle CHANGE_PROGRAMMING_LANGUAGE', () => {
        expect(
            reducer.hideDoneProblems(null,
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: true
                }
            )
        ).toEqual(true);

        expect(
            reducer.hideDoneProblems(true,
                {
                    type: types.HIDE_DONE_PROBLEMS,
                    hideDoneProblems: false
                }
            )
        ).toEqual(false);
    });

    it('should be unchanged for unsupported action type', () => {
        expect(
            reducer.hideDoneProblems(true,
                {
                    type: "UNSUPPORTED_TYPE"
                }
            )
        ).toEqual(true);
    });
});