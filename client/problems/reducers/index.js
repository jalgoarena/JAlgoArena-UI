import * as types from "../../constants/ActionTypes";

export function editor(state = {
    sourceCode: null,
    judgeResult: { statusCode: 'WAITING' },
    programmingLanguage: 'java'
}, action) {
    switch (action.type) {
        case types.CHANGE_SOURCE_CODE:
            return Object.assign({}, state, {sourceCode: action.sourceCode});
        case types.SET_CURRENT_PROBLEM:
        case types.SUBMISSION_SAVED:
        case types.PROBLEM_REFRESH:
            return Object.assign({}, state, {
                sourceCode: null,
                judgeResult: { statusCode: 'WAITING' }
            });
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return Object.assign({}, state, {
                sourceCode: null,
                judgeResult: { statusCode: 'WAITING' },
                programmingLanguage: action.programmingLanguage
            });
        case types.JUDGE_RESULT_RECEIVED:
            return Object.assign({}, state, {judgeResult: action.result});
        default:
            return state;
    }
}

export function problems(state = {
    items: [],
    currentProblemId: null,
    difficultyFilter: 0,
    doneProblemsFilter: false,
    rawItems: []
}, action) {
    switch (action.type) {
        case types.PROBLEMS_RECEIVED:
            return Object.assign({}, state, { items: action.problems });
        case types.SET_CURRENT_PROBLEM:
            return Object.assign({}, state, { currentProblemId: action.problemId });
        case types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER:
            return Object.assign({}, state, { difficultyFilter: action.level });
        case types.HIDE_DONE_PROBLEMS:
            return Object.assign({}, state, { doneProblemsFilter: action.hideDoneProblems });
        case types.FETCH_RAW_PROBLEMS:
            return Object.assign({}, state, { rawItems: action.rawProblems });
        default:
            return state;
    }
}
