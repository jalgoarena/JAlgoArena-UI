import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('programmingLanguage reducer', () => {
    it('should handle CHANGE_PROGRAMMING_LANGUAGE', () => {
        expect(
            reducer.programmingLanguage(null,
                {
                    type: types.CHANGE_PROGRAMMING_LANGUAGE,
                    programmingLanguage: 'kotlin'
                }
            )
        ).toEqual('kotlin');

        expect(
            reducer.programmingLanguage('java',
                {
                    type: types.CHANGE_PROGRAMMING_LANGUAGE,
                    programmingLanguage: 'kotlin'
                }
            )
        ).toEqual('kotlin');
    });

    it('should be unchanged for unsupported action type', () => {
        expect(
            reducer.programmingLanguage('java',
                {
                    type: "UNSUPPORTED_TYPE"
                }
            )
        ).toEqual('java');
    });
});