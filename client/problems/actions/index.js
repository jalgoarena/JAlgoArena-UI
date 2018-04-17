// @flow
import Submission from "../domain/Submission";

type Action = {type:string}
    | {type:string, submissionId:string}
    | {type:string, sourceCode:string}
    | {type:string, problemId:string}
    | {type:string, problems:Array<Problem>}
    | {type:string, rawProblems:Array<RawProblem>}
    | {type:string, level:number}
    | {type:string, hideDoneProblems:boolean}
    | {type:string, programmingLanguage:string}

import fetch from 'isomorphic-fetch';

import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import JudgeRequest from "../domain/JudgeRequest";
import Problem from "../domain/Problem";
import RawProblem from "../domain/RawProblem";

export function startJudge(): Action {
    return {
        type: types.JUDGE_REQUEST
    };
}

export function judgeCode(sourceCode: string, problemId: string, userId: string, language: string) {

    let token: ?string = localStorage.getItem('jwtToken');

    if (token == null) {
        return setErrorMessage("You have to be logged in");
    }

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        method: 'post',
        body: JSON.stringify(new JudgeRequest(
            sourceCode,
            userId,
            language
        ))
    };
    return (dispatch: Dispatch) => {
        return fetch(`/api/queue/api/problems/${problemId}/publish`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Queue Service"));
                } else {
                    dispatch(submissionPublished((json: Submission)));
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Judge Service")));
    };

}

function submissionPublished(result: Submission): Action {
    return {
        type: types.SUBMISSION_PUBLISHED,
        submissionId: result.submissionId
    }
}

export function changeSourceCode(newValue: string): Action {
    return {
        type: types.CHANGE_SOURCE_CODE,
        sourceCode: newValue
    }
}

export function problemRefresh(): Action {
    return {
        type: types.PROBLEM_REFRESH
    }
}

export function setCurrentProblem(problemId: string): Action {
    return {
        type: types.SET_CURRENT_PROBLEM,
        problemId
    }
}

export function setProblemsDifficultyVisibilityFilter(level: number): Action {
    return {
        type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
        level
    }
}

export function changeCurrentProgrammingLanguage(language: string): Action {
    return {
        type: types.CHANGE_PROGRAMMING_LANGUAGE,
        programmingLanguage: language
    }
}

export function hideDoneProblems(value: boolean): Action {
    return {
        type: types.HIDE_DONE_PROBLEMS,
        hideDoneProblems: value
    }
}

export function fetchProblems() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/judge/api/problems`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Judge Service"));
                } else {
                    dispatch(setProblems((json: Array<Problem>)))
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Judge Service")));
    };
}

function setProblems(problems: Array<Problem>): Action {
    return {
        type: types.FETCH_PROBLEMS_SUCCESS,
        problems
    }
}

export function startFetchingProblems(): Action {
    return {
        type: types.FETCH_PROBLEMS_REQUEST
    };
}

export function fetchRawProblems() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/problems/api/problems`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Problems Service"));
                } else {
                    dispatch(setRawProblems((json: Array<RawProblem>)));
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Problems Service")));
    };
}

function setRawProblems(rawProblems: Array<RawProblem>): Action {
    return {
        type: types.FETCH_RAW_PROBLEMS,
        rawProblems
    }
}