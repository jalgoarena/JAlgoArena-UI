import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import {
    CHANGE_SOURCE_CODE,
    FETCH_PROBLEMS,
    JUDGE_RESULT_RECEIVED,
    SET_CURRENT_PROBLEM,
    SUBMISSION_SAVED,
    FETCH_SUBMISSIONS,
    FETCH_RANKING,
    START_JUDGE,
    START_FETCHING_PROBLEMS,
    START_SUBMISSION,
    FETCH_PROBLEM_RANKING,
    SET_CURRENT_PROBLEMS_FILTER,
    PROBLEM_REFRESH,
    CLOSE_WORK_IN_PROGRESS_WINDOW,
    DELETE_SUBMISSION,
    SET_SUBMISSIONS_FILTER,
    CHANGE_PROGRAMMING_LANGUAGE,
    HIDE_DONE_PROBLEMS
} from '../actions';

import {
    CHECKED_SESSION_STATUS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    START_SIGNUP,
    START_LOGIN
} from '../actions/AuthActions';

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
        case CHANGE_SOURCE_CODE:
            return action.sourceCode;
        case SET_CURRENT_PROBLEM:
        case SUBMISSION_SAVED:
        case PROBLEM_REFRESH:
        case CHANGE_PROGRAMMING_LANGUAGE:
            return null;
        default:
            return state;
    }
}

function problems(state = [], action) {
    switch (action.type) {
        case FETCH_PROBLEMS:
            return action.problems;
        default:
            return state;
    }
}

function result(state = { statusCode: 'WAITING' }, action) {
    switch (action.type) {
        case JUDGE_RESULT_RECEIVED:
            return action.result;
        case SET_CURRENT_PROBLEM:
        case SUBMISSION_SAVED:
        case PROBLEM_REFRESH:
            return { statusCode: 'WAITING' };
        default:
            return state;
    }
}

function showModal(state = false, action) {
    switch (action.type) {
        case START_SIGNUP:
        case START_LOGIN:
        case START_JUDGE:
        case START_FETCHING_PROBLEMS:
        case START_SUBMISSION:
            return true;
        case SET_CURRENT_PROBLEM:
        case FETCH_PROBLEMS:
        case JUDGE_RESULT_RECEIVED:
        case SUBMISSION_SAVED:
        case FETCH_SUBMISSIONS:
        case FETCH_RANKING:
        case CHECKED_SESSION_STATUS:
        case LOGIN_FAIL:
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS:
        case SIGNUP_FAIL:
        case SIGNUP_SUCCESS:
        case CLOSE_WORK_IN_PROGRESS_WINDOW:
            return false;
        default:
            return state;
    }
}

function currentProblemId(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_PROBLEM:
            return action.problemId;
        default:
            return state;
    }
}

function submissions(state = [], action) {
    switch (action.type) {
        case FETCH_SUBMISSIONS:
        case DELETE_SUBMISSION:
            return action.submissions;
        default:
            return state;
    }
}

function ranking(state = [], action) {
    switch (action.type) {
        case FETCH_RANKING:
            return action.ranking;
        default:
            return state;
    }
}

function problemRanking(state = [], action) {
    switch (action.type) {
        case FETCH_PROBLEM_RANKING:
            return action.problemRanking;
        default:
            return state;
    }
}

function problemsFilter(state = 0, action) {
    switch (action.type) {
        case SET_CURRENT_PROBLEMS_FILTER:
            return action.level;
        default:
            return state;
    }
}

function submissionsFilter(state = 'ALL', action) {
    switch (action.type) {
        case SET_SUBMISSIONS_FILTER:
            return action.status;
        default:
            return state;
    }
}

function programmingLanguage(state = 'java', action) {
    switch (action.type) {
        case CHANGE_PROGRAMMING_LANGUAGE:
            return action.programmingLanguage;
        default:
            return state;
    }
}

function hideDoneProblems(state = false, action) {
    switch (action.type) {
        case HIDE_DONE_PROBLEMS:
            return action.hideDoneProblems;
        default:
            return state;
    }
}

export default rootReducer;