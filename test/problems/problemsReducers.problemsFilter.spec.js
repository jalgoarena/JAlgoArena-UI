import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('currentProblemId reducer', () => {
    it('should handle SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER', () => {
        expect(
            reducer.problemsFilter(null,
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 1
                }
            )
        ).toEqual(1);

        expect(
            reducer.problemsFilter(1,
                {
                    type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
                    level: 2
                }
            )
        ).toEqual(2);
    });

    it('should be unchanged for unsupported action type', () => {
        expect(
            reducer.problemsFilter(1,
                {
                    type: "UNSUPPORTED_TYPE"
                }
            )
        ).toEqual(1);
    });
});