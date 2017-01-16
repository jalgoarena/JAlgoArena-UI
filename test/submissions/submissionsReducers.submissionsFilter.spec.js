import * as reducer from '../../client/submissions/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('ranking reducer', () => {
    it('should handle SET_SUBMISSIONS_FILTER', () => {
        expect(
            reducer.submissionsFilter('ALL',
                {
                    type: types.SET_SUBMISSIONS_FILTER,
                    status: "ACCEPTED"
                }
            )
        ).toEqual("ACCEPTED");
    });
});