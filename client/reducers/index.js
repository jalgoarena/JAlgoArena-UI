import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as types from "../constants/ActionTypes";

import {updateUserInfo} from "./AuthReducers";

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

function sourceCode(state = null, action) {
    switch (action.type) {
        case types.CHANGE_SOURCE_CODE:
            return action.sourceCode;
        case types.SET_CURRENT_PROBLEM:
        case types.SUBMISSION_SAVED:
        case types.PROBLEM_REFRESH:
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return null;
        default:
            return state;
    }
}

function problems(state = [], action) {
    switch (action.type) {
        case types.FETCH_PROBLEMS:
            return action.problems;
        default:
            return state;
    }
}

function result(state = { statusCode: 'WAITING' }, action) {
    switch (action.type) {
        case types.JUDGE_RESULT_RECEIVED:
            return action.result;
        case types.SET_CURRENT_PROBLEM:
        case types.SUBMISSION_SAVED:
        case types.PROBLEM_REFRESH:
            return { statusCode: 'WAITING' };
        default:
            return state;
    }
}

function showModal(state = false, action) {
    switch (action.type) {
        case types.START_SIGNUP:
        case types.START_LOGIN:
        case types.START_JUDGE:
        case types.START_FETCHING_PROBLEMS:
        case types.START_SUBMISSION:
            return true;
        case types.SET_CURRENT_PROBLEM:
        case types.FETCH_PROBLEMS:
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

function currentProblemId(state = null, action) {
    switch (action.type) {
        case types.SET_CURRENT_PROBLEM:
            return action.problemId;
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

function problemsFilter(state = 0, action) {
    switch (action.type) {
        case types.SET_CURRENT_PROBLEMS_FILTER:
            return action.level;
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

function programmingLanguage(state = 'java', action) {
    switch (action.type) {
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return action.programmingLanguage;
        default:
            return state;
    }
}

function hideDoneProblems(state = false, action) {
    switch (action.type) {
        case types.HIDE_DONE_PROBLEMS:
            return action.hideDoneProblems;
        default:
            return state;
    }
}

export default rootReducer;