import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('rawProblems reducer', () => {
    it('should handle FETCH_RAW_PROBLEMS', () => {
        expect(
            reducer.rawProblems([],
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [{problemId: "fib"}]
                }
            )
        ).toEqual([{problemId: "fib"}]);

        expect(
            reducer.rawProblems([{problemId: "fib"}],
                {
                    type: types.FETCH_RAW_PROBLEMS,
                    rawProblems: [{problemId: "fib"}, {problemId: "stoi"}]
                }
            )
        ).toEqual([{problemId: "fib"}, {problemId: "stoi"}]);
    });
});