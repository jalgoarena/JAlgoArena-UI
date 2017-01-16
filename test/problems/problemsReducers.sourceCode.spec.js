import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('sourceCode reducer', () => {
    it('should handle CHANGE_SOURCE_CODE', () => {
        expect(
            reducer.sourceCode(null,
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution'
                }
            )
        ).toEqual('class Solution');

        expect(
            reducer.sourceCode('class Solution',
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution2'
                }
            )
        ).toEqual('class Solution2');
    });

    it('should be unchanged for unsupported action type', () => {
        expect(
            reducer.sourceCode('class Solution',
                {
                    type: "UNSUPPORTED_TYPE"
                }
            )
        ).toEqual('class Solution');
    });

    let actionsCleaningSourceCode = [
        types.SET_CURRENT_PROBLEM,
        types.SET_CURRENT_PROBLEM,
        types.SUBMISSION_SAVED,
        types.PROBLEM_REFRESH,
        types.CHANGE_PROGRAMMING_LANGUAGE
    ];

    actionsCleaningSourceCode.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.sourceCode('class Solution',
                    {
                        type: actionType
                    }
                )
            ).toEqual(null);
        });
    });
});