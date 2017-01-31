import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('editor reducer', () => {
    it('should handle CHANGE_SOURCE_CODE', () => {
        expect(
            reducer.editor(null,
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution'
                }
            )
        ).toEqual({sourceCode: 'class Solution'});

        expect(
            reducer.editor({sourceCode: 'class Solution'},
                {
                    type: types.CHANGE_SOURCE_CODE,
                    sourceCode: 'class Solution2'
                }
            )
        ).toEqual({sourceCode: 'class Solution2'});
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
                reducer.editor({sourceCode: 'class Solution'},
                    {
                        type: actionType
                    }
                )
            ).toEqual({sourceCode: null});
        });
    });
});