import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as types from "../../constants/ActionTypes";

import {editor, problems} from "../../problems/reducers";
import {auth} from "../../users/reducers";
import {ranking, problemRanking} from "../../ranking/reducers";
import {submissions, submissionsFilter} from "../../submissions/reducers";
import {solvedProblemsRatio} from "../../submissions/reducers/index";

const rootReducer = combineReducers({
    editor,
    problems,
    showModal,
    routing: routerReducer,
    auth,
    submissions,
    ranking,
    problemRanking,
    submissionsFilter,
    solvedProblemsRatio,
    errorMessage
});

export function showModal(state = false, action) {

    if (action.error) {
        return false;
    }

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
        case types.SET_ERROR_MESSAGE:
            return false;
        default:
            return state;
    }
}

export function errorMessage(state = null, action) {
    const { type, error } = action;

    if (type === types.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return error;
    }

    return state;
}

export default rootReducer;