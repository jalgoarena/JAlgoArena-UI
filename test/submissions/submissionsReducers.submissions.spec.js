import * as reducer from '../../client/submissions/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('ranking reducer', () => {
    it('should handle FETCH_SUBMISSIONS', () => {
        expect(
            reducer.submissions({items: []},
                {
                    type: types.FETCH_SUBMISSIONS,
                    submissions: [{
                        username: "julia",
                        problemId: "fib"
                    }]
                }
            )
        ).toEqual({items: [{
            username: "julia",
            problemId: "fib"
        }]});

        expect(
            reducer.submissions({items: [{
                    username: "julia",
                    problemId: "fib"
                }]},
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
        ).toEqual({items: [{
            username: "julia",
            problemId: "fib"
        }, {
            username: "mikolaj",
            problemId: "stoi"
        }]});
    });
});