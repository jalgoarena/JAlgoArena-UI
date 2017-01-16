import * as reducer from '../../client/problems/reducers';
import * as types from '../../client/constants/ActionTypes'

describe('problems reducer', () => {
    it('should handle PROBLEMS_RECEIVED', () => {
        expect(
            reducer.problems([],
                {
                    type: types.PROBLEMS_RECEIVED,
                    problems: [{problemId: "fib"}]
                }
            )
        ).toEqual([{problemId: "fib"}]);

        expect(
            reducer.problems([{problemId: "fib"}],
                {
                    type: types.PROBLEMS_RECEIVED,
                    problems: [{problemId: "fib"}, {problemId: "stoi"}]
                }
            )
        ).toEqual([{problemId: "fib"}, {problemId: "stoi"}]);
    });
});