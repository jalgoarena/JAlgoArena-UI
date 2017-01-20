import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as types from "../../constants/ActionTypes";

import {sourceCode, problems, result, currentProblemId, problemsFilter} from "../../problems/reducers";
import {userAuthSession, userUpdated} from "../../users/reducers";
import {ranking, problemRanking} from "../../ranking/reducers";
import {submissions, submissionsFilter} from "../../submissions/reducers";
import {rawProblems, programmingLanguage, hideDoneProblems} from "../../problems/reducers";

const rootReducer = combineReducers({
    sourceCode,
    problems,
    result,
    showModal,
    currentProblemId,
    routing: routerReducer,
    userAuthSession,
    submissions,
    ranking,
    problemRanking,
    problemsFilter,
    submissionsFilter,
    programmingLanguage,
    hideDoneProblems,
    rawProblems,
    userUpdated
});

export function showModal(state = false, action) {
    switch (action.type) {
        case types.START_SIGNUP:
        case types.START_LOGIN:
        case types.START_JUDGE:
        case types.START_FETCHING_PROBLEMS:
        case types.START_SUBMISSION:
            return true;
        case types.SET_CURRENT_PROBLEM:
        case types.PROBLEMS_RECEIVED:
        case types.JUDGE_RESULT_RECEIVED:
        case types.SUBMISSION_SAVED:
        case types.FETCH_SUBMISSIONS:
        case types.FETCH_RANKING:
        case types.CHECKED_SESSION_STATUS:
        case types.LOGIN_FAIL:
        case types.LOGIN_SUCCESS:
        case types.LOGOUT_SUCCESS:
        case types.SIGNUP_FAIL:
        case types.SIGNUP_SUCCESS:
        case types.CLOSE_WORK_IN_PROGRESS_WINDOW:
            return false;
        default:
            return state;
    }
}

export default rootReducer;