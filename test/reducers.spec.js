import reducer from '../client/common/reducers';
import {showModal} from "../client/common/reducers";
import * as types from "../client/constants/ActionTypes";

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
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
                    doneProblemsFilter: false,
                    rawItems: []
                },
                showModal: false,
                ranking: {
                    general: [],
                    problemRanking: []
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
                    users: null,
                    updatedUser: null
                },
                config: {
                    emailErrorMessage: "Please enter a valid email address",
                    emailRegex: "^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$",
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

    [types.SIGNUP_REQUEST,
        types.LOGIN_REQUEST,
        types.JUDGE_REQUEST,
        types.FETCH_PROBLEMS_REQUEST
    ].forEach(actionType => {
        expect(
            showModal(false,
                {type: actionType}
            )
        ).toEqual(true);
    });

    [types.SET_CURRENT_PROBLEM,
        types.FETCH_PROBLEMS_SUCCESS,
        types.SUBMISSION_PUBLISHED,
        types.FETCH_SUBMISSIONS,
        types.FETCH_RANKING,
        types.CHECKED_SESSION_STATUS,
        types.LOGIN_FAIL,
        types.LOGIN_SUCCESS,
        types.LOGOUT_SUCCESS,
        types.SIGNUP_FAIL,
        types.SIGNUP_SUCCESS,
        types.CLOSE_WORK_IN_PROGRESS_WINDOW
    ].forEach(actionType => {
        expect(
            showModal(true,
                {type: actionType}
            )
        ).toEqual(false);
    });
});