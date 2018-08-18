import {rootReducer} from '../../client/common/reducers';
import {AnyAction} from "redux";

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(
            rootReducer({}, {} as AnyAction)
        ).toEqual(
            {
                editor: {
                    sourceCode: null,
                    submissionId: null
                },
                problems: {
                    currentProblemId: null,
                    items: [],
                    difficultyFilter: 0,
                    doneProblemsFilter: false
                },
                ranking: {
                    general: [],
                    previousRanking: [],
                    problemRanking: [],
                    startDate: '2018-08-01',
                    refreshInProgress: false
                },
                submissions: {
                    items: [],
                    statusFilter: 'ALL',
                    problemsSolutionsRatio: [],
                    stats: []
                },
                auth: {
                    user: null,
                    error: null,
                    users: null
                },
                config: {
                    emailErrorMessage: "Please enter a valid email address",
                    emailRegex: "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$",
                    regions: [
                        "Kraków",
                        "Wrocław"
                    ],
                    teams: [
                        "Team A",
                        "Team B",
                        "Team C"
                    ],
                    title: "Start to solve your first problem",
                },

                errorMessage: null,
                webSocketConnected: false
            }
        )
    });
});