// @flow

import * as types from "../../constants/ActionTypes";
import JudgeResponse from "../../domain/JudgeResponse";
import Problem from "../../domain/Problem";
import RawProblem from "../../domain/RawProblem";

type EditorState = {
    sourceCode: ?string;
    judgeResult: JudgeResponse | {statusCode: string};
    programmingLanguage: string;
}

type EditorAction = {
    type: string,
    sourceCode?: string,
    programmingLanguage?: string,
    result?: JudgeResponse
}

export function editor(state: EditorState = {
    sourceCode: null,
    judgeResult: {statusCode: 'WAITING'},
    programmingLanguage: 'java'
}, action: EditorAction): EditorState {
    switch (action.type) {
        case types.CHANGE_SOURCE_CODE:
            return Object.assign({}, state, {
                sourceCode: action.sourceCode
            });
        case types.SET_CURRENT_PROBLEM:
        case types.PROBLEM_REFRESH:
            return Object.assign({}, state, {
                sourceCode: null,
                judgeResult: {statusCode: 'WAITING'}
            });
        case types.CHANGE_PROGRAMMING_LANGUAGE:
            return Object.assign({}, state, {
                sourceCode: null,
                judgeResult: {statusCode: 'WAITING'},
                programmingLanguage: action.programmingLanguage
            });
        case types.JUDGE_RESULT_RECEIVED:
            return Object.assign({}, state, {
                judgeResult: action.result
            });
        default:
            return state;
    }
}

type ProblemsState = {
    items: Array<Problem>,
    currentProblemId: ?string,
    difficultyFilter: number,
    doneProblemsFilter: boolean,
    rawItems: Array<RawProblem>
}

type ProblemsAction = {
    type: string,
    problems?: Array<Problem>,
    problemId?: string,
    level?: number,
    hideDoneProblems?: boolean,
    rawProblems?: Array<RawProblem>
}

export function problems(state: ProblemsState = {
    items: [],
    currentProblemId: null,
    difficultyFilter: 0,
    doneProblemsFilter: false,
    rawItems: []
}, action: ProblemsAction): ProblemsState {
    switch (action.type) {
        case types.FETCH_PROBLEMS_SUCCESS:
            return Object.assign({}, state, {
                items: action.problems
            });
        case types.SET_CURRENT_PROBLEM:
            return Object.assign({}, state, {
                currentProblemId: action.problemId
            });
        case types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                difficultyFilter: action.level
            });
        case types.HIDE_DONE_PROBLEMS:
            return Object.assign({}, state, {
                doneProblemsFilter: action.hideDoneProblems
            });
        case types.FETCH_RAW_PROBLEMS:
            return Object.assign({}, state, {
                rawItems: action.rawProblems
            });
        default:
            return state;
    }
}
