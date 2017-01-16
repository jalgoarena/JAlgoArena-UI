import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('result reducer', () => {
    it('should handle JUDGE_RESULT_RECEIVED', () => {
        expect(
            reducer.result([],
                {
                    type: types.JUDGE_RESULT_RECEIVED,
                    result: {statusCode: "ACCEPTED"}
                }
            )
        ).toEqual({statusCode: "ACCEPTED"});

        expect(
            reducer.result({statusCode: "ACCEPTED"},
                {
                    type: types.JUDGE_RESULT_RECEIVED,
                    result: {statusCode: "COMPILE_ERROR"}
                }
            )
        ).toEqual({statusCode: "COMPILE_ERROR"});
    });

    it('should be unchanged for unsupported action type', () => {
        expect(
            reducer.result({statusCode: "ACCEPTED"},
                {
                    type: "UNSUPPORTED_TYPE"
                }
            )
        ).toEqual({statusCode: "ACCEPTED"});
    });

    let actionsResettingResult = [
        types.SET_CURRENT_PROBLEM,
        types.SUBMISSION_SAVED,
        types.PROBLEM_REFRESH
    ];

    actionsResettingResult.forEach(actionType => {
        it(`should handle ${actionType}`, () => {
            expect(
                reducer.result({statusCode: "ACCEPTED"},
                    {
                        type: actionType
                    }
                )
            ).toEqual({statusCode: "WAITING"});
        });
    });
});