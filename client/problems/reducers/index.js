import * as types from "../../constants/ActionTypes";

export function editor(state = {sourceCode: null, judgeResult: { statusCode: 'WAITING' }}, action) {
    switch (action.type) {
        case types.CHANGE_SOURCE_CODE:
            return Object.assign({}, state, {sourceCode: action.sourceCode});
        case types.SET_CURRENT_PROBLEM:
        case types.SUBMISSION_SAVED:
        case types.PROBLEM_REFRESH:
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return Object.assign({}, state, {sourceCode: null, judgeResult: { statusCode: 'WAITING' }});
        case types.JUDGE_RESULT_RECEIVED:
            return Object.assign({}, state, {judgeResult: action.result});
        default:
            return state;
    }
}

export function problems(state = [], action) {
    switch (action.type) {
        case types.PROBLEMS_RECEIVED:
            return action.problems;
        default:
            return state;
    }
}

export function currentProblemId(state = null, action) {
    switch (action.type) {
        case types.SET_CURRENT_PROBLEM:
            return action.problemId;
        default:
            return state;
    }
}

export function problemsFilter(state = 0, action) {
    switch (action.type) {
        case types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER:
            return action.level;
        default:
            return state;
    }
}

export function programmingLanguage(state = 'java', action) {
    switch (action.type) {
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return action.programmingLanguage;
        default:
            return state;
    }
}

export function hideDoneProblems(state = false, action) {
    switch (action.type) {
        case types.HIDE_DONE_PROBLEMS:
            return action.hideDoneProblems;
        default:
            return state;
    }
}

export function rawProblems(state = [], action) {
    switch (action.type) {
        case types.FETCH_RAW_PROBLEMS:
            return action.rawProblems;
        default:
            return state;
    }
}