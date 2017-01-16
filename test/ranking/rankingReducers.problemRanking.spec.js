import * as reducer from '../../client/ranking/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('problemRanking reducer', () => {
    it('should handle FETCH_PROBLEM_RANKING', () => {
        expect(
            reducer.problemRanking([],
                {
                    type: types.FETCH_PROBLEM_RANKING,
                    problemRanking: [{
                        username: "julia",
                        score: 20
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            score: 20
        }]);

        expect(
            reducer.problemRanking([{
                    username: "julia",
                    score: 20
                }],
                {
                    type: types.FETCH_PROBLEM_RANKING,
                    problemRanking: [{
                        username: "julia",
                        score: 20
                    }, {
                        username: "mikolaj",
                        score: 10
                    }]
                }
            )
        ).toEqual([{
            username: "julia",
            score: 20
        }, {
            username: "mikolaj",
            score: 10
        }]);
    });
});