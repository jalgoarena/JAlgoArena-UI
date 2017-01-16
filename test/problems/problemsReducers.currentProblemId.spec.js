import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('currentProblemId reducer', () => {
    it('should handle SET_CURRENT_PROBLEM', () => {
        expect(
            reducer.currentProblemId(null,
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "fib"
                }
            )
        ).toEqual("fib");

        expect(
            reducer.currentProblemId("fib",
                {
                    type: types.SET_CURRENT_PROBLEM,
                    problemId: "stoi"
                }
            )
        ).toEqual("stoi");
    });
});