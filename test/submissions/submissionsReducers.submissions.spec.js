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
                        level: 1,
                        problemId: "fib"
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            level: 1,
            problemId: "fib"
        }]);

        expect(
            reducer.submissions([{
                    username: "julia",
                    level: 1,
                    problemId: "fib"
                }],
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [{
                        username: "julia",
                        level: 1,
                        problemId: "fib"
                    }, {
                        username: "mikolaj",
                        level: 2,
                        problemId: "stoi"
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            level: 1,
            problemId: "fib"
        }, {
            username: "mikolaj",
            level: 2,
            problemId: "stoi"
        }]);
    });
});