import {Submission} from '../domain/Submission';
import * as types from '../../constants/ActionTypes';
import {setErrorMessage} from '../../common/actions';
import {JudgeRequest} from '../domain/JudgeRequest';
import Problem from '../domain/Problem';
import {Dispatch} from "redux";

interface Action {
    type: string
    submissionId?: string
    sourceCode?: string
    problemId?: string
    problems?: Array<Problem>
    level?: number
    hideDoneProblems?: boolean
}

export function startJudge(): Action {
    return {
        type: types.JUDGE_REQUEST,
    };
}

export function judgeCode(sourceCode: string, problemId: string, userId: string, token: string) {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },

        method: 'post',
        body: JSON.stringify(new JudgeRequest(sourceCode, userId)),
    };

    return (dispatch: Dispatch<Action>) => {
        return fetch(`/api/queue/api/problems/${problemId}/publish`, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    dispatch(setErrorMessage('Cannot connect to Queue Service: \n' + JSON.stringify(json.error)));
                } else {
                    dispatch(submissionPublished(json as Submission));
                }
            })
            .catch((error) => console.log(`[err] POST /api/queue/api/problems/${problemId}/publish:` + error));
    };
}

function submissionPublished(result: Submission): Action {
    return {
        type: types.SUBMISSION_PUBLISHED,
        submissionId: result.submissionId,
    };
}

export function changeSourceCode(newValue: string): Action {
    return {
        type: types.CHANGE_SOURCE_CODE,
        sourceCode: newValue,
    };
}

export function problemRefresh(): Action {
    return {
        type: types.PROBLEM_REFRESH,
    };
}

export function setCurrentProblem(problemId: string): Action {
    return {
        type: types.SET_CURRENT_PROBLEM,
        problemId,
    };
}

export function setProblemsDifficultyVisibilityFilter(level: number): Action {
    return {
        type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
        level,
    };
}

export function hideDoneProblems(value: boolean): Action {
    return {
        type: types.HIDE_DONE_PROBLEMS,
        hideDoneProblems: value,
    };
}

export function fetchProblems() {
    const options = {
        headers: {
            Accept: 'application/json',
        },

        method: 'get',
    };

    return (dispatch: Dispatch<Action>) => {
        return fetch(`/api/judge/api/problems`, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    dispatch(setErrorMessage('Cannot connect to Judge Service: \n' + JSON.stringify(json.error)));
                } else {
                    dispatch(setProblems(json as Problem[]));
                }
            })
            .catch((error) => console.log(`[err] GET /api/judge/api/problems:` + error));
    };
}

function setProblems(problems: Problem[]): Action {
    return {
        type: types.FETCH_PROBLEMS_SUCCESS,
        problems,
    };
}

export function startFetchingProblems(): Action {
    return {
        type: types.FETCH_PROBLEMS_REQUEST,
    };
}
