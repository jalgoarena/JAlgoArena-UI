import * as reducer from '../../client/ranking/reducers';
import * as types from '../../client/constants/ActionTypes';

describe('ranking reducer', () => {
    it('should handle FETCH_RANKING', () => {
        expect(
            reducer.ranking([],
                {
                    type: types.FETCH_RANKING,
                    ranking: [{
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
            reducer.ranking([{
                    username: "julia",
                    score: 20
                }],
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
        ).toEqual([{
            username: "julia",
            score: 20
        }, {
            username: "mikolaj",
            score: 10
        }]);
    });
});