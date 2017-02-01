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

    it('should handle SET_SUBMISSIONS_FILTER', () => {
        expect(
            reducer.submissions({statusFilter: 'ALL'},
                {
                    type: types.SET_SUBMISSIONS_FILTER,
                    status: "ACCEPTED"
                }
            )
        ).toEqual({statusFilter: "ACCEPTED"});
    });

    it('should handle FETCH_PROBLEMS_SOLUTION_RATIO', () => {
        expect(
            reducer.submissions({problemsSolutionsRatio: []},
                {
                    type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
                    solvedProblemsRatio: [{problemId: "fib", count: 1}]
                }
            )
        ).toEqual({problemsSolutionsRatio: [{problemId: "fib", count: 1}]});
    });
});