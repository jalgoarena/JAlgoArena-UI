import * as reducer from '../../client/ranking/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('ranking reducer', () => {
    it('should handle FETCH_RANKING', () => {
        expect(
            reducer.ranking({general: []},
                {
                    type: types.FETCH_RANKING,
                    ranking: [{
                        username: "julia",
                        score: 20
                    }]
                }
            )
        ).toEqual({general: [{
            username: "julia",
            score: 20
        }]});

        expect(
            reducer.ranking({general: [{
                    username: "julia",
                    score: 20
                }]},
                {
                    type: types.FETCH_RANKING,
                    ranking: [{
                        username: "julia",
                        score: 20
                    }, {
                        username: "mikolaj",
                        score: 10
                    }]
                }
            )
        ).toEqual({general: [{
            username: "julia",
            score: 20
        }, {
            username: "mikolaj",
            score: 10
        }]});
    });

    it('should handle FETCH_PROBLEM_RANKING', () => {
        expect(
            reducer.ranking({problemRanking: []},
                {
                    type: types.FETCH_PROBLEM_RANKING,
                    problemRanking: [{
                        username: "julia",
                        score: 20
                    }]
                }
            )
        ).toEqual({problemRanking: [{
            username: "julia",
            score: 20
        }]});

        expect(
            reducer.ranking({problemRanking: [{
                    username: "julia",
                    score: 20
                }]},
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
        ).toEqual({problemRanking: [{
            username: "julia",
            score: 20
        }, {
            username: "mikolaj",
            score: 10
        }]});
    });
});