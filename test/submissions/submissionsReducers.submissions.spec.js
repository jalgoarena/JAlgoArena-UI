import * as reducer from '../../client/submissions/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('ranking reducer', () => {
    it('should handle FETCH_SUBMISSIONS', () => {
        expect(
            reducer.submissions([],
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [{
                        username: "julia",
                        problemId: "fib"
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            problemId: "fib"
        }]);

        expect(
            reducer.submissions([{
                    username: "julia",
                    problemId: "fib"
                }],
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [{
                        username: "julia",
                        problemId: "fib"
                    }, {
                        username: "mikolaj",
                        problemId: "stoi"
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            problemId: "fib"
        }, {
            username: "mikolaj",
            problemId: "stoi"
        }]);
    });
});