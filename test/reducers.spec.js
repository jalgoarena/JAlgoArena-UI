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
                    judgeResult: {statusCode: 'WAITING'},
                    programmingLanguage: 'java'
                },
                problems: {
                    currentProblemId: null,
                    items: [],
                    difficultyFilter: 0,
                    doneProblemsFilter: false,
                    rawItems: []
                },
                showModal: false,
                ranking: [],
                problemRanking: [],
                submissions: [],
                submissionsFilter: 'ALL',
                userAuthSession: {user: null, error: null, users: null},
                routing: {"locationBeforeTransitions": null},
                userUpdated: null,
                solvedProblemsRatio: [],
                errorMessage: null
            }
        )
    });

    [types.START_SIGNUP,
        types.START_LOGIN,
        types.START_JUDGE,
        types.START_FETCHING_PROBLEMS,
        types.START_SUBMISSION
    ].forEach(actionType => {
        expect(
            showModal({},
                {type: actionType}
            )
        ).toEqual(true);
    });

    [types.SET_CURRENT_PROBLEM,
        types.PROBLEMS_RECEIVED,
        types.JUDGE_RESULT_RECEIVED,
        types.SUBMISSION_SAVED,
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
            showModal({},
                {type: actionType}
            )
        ).toEqual(false);
    });
});