import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as types from "../constants/ActionTypes";

import {updateUserInfo} from "../users/reducers";
import {sourceCode, problems, result, currentProblemId, problemsFilter, programmingLanguage} from "../problems/reducers";
import {hideDoneProblems} from "../problems/actions";

const rootReducer = combineReducers({
    sourceCode,
    problems,
    result,
    showModal,
    currentProblemId,
    routing: routerReducer,
    userAuthSession: updateUserInfo,
    submissions,
    ranking,
    problemRanking,
    problemsFilter,
    submissionsFilter,
    programmingLanguage,
    hideDoneProblems
});

function showModal(state = false, action) {
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

function submissions(state = [], action) {
    switch (action.type) {
        case types.FETCH_SUBMISSIONS:
        case types.DELETE_SUBMISSION:
            return action.submissions;
        default:
            return state;
    }
}

function ranking(state = [], action) {
    switch (action.type) {
        case types.FETCH_RANKING:
            return action.ranking;
        default:
            return state;
    }
}

function problemRanking(state = [], action) {
    switch (action.type) {
        case types.FETCH_PROBLEM_RANKING:
            return action.problemRanking;
        default:
            return state;
    }
}

function submissionsFilter(state = 'ALL', action) {
    switch (action.type) {
        case types.SET_SUBMISSIONS_FILTER:
            return action.status;
        default:
            return state;
    }
}

export default rootReducer;