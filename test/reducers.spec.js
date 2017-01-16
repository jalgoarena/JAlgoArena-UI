import reducer from '../client/common/reducers';

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                sourceCode: null,
                problems: [],
                result: { statusCode: 'WAITING' },
                showModal: false,
                currentProblemId: null,
                problemsFilter: 0,
                programmingLanguage: 'java',
                hideDoneProblems: false,
                ranking: [],
                problemRanking: [],
                submissions: [],
                submissionsFilter: 'ALL',
                userAuthSession: { user: null, error: null, users: null },
                routing: { "locationBeforeTransitions": null}
            }
        )
    });
});