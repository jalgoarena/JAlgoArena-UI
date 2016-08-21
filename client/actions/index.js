import fetch from 'isomorphic-fetch';

const JUDGE_SERVER_URL = 'https://jalgoarena.herokuapp.com';

export const JUDGE_RESULT_RECEIVED = 'JUDGE_RESULT_RECEIVED';
export function judgeCode(sourceCode, problemId) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        method: 'post',
        body: sourceCode
    };

    return dispatch => {
        return fetch(`${JUDGE_SERVER_URL}/problems/${problemId}/submit`, options)
            .then(response => response.json())
            .then(json => dispatch(judgeResultReceived(json)))
    };
}

function judgeResultReceived(result) {
    return {
        type: JUDGE_RESULT_RECEIVED,
        result
    }
}

export const SHOW_MODAL = 'SHOW_MODAL';
export function showModal() {
    return {
        type: SHOW_MODAL
    };
}

export const FETCH_PROBLEMS = 'FETCH_PROBLEMS';
export function fetchProblems() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${JUDGE_SERVER_URL}/problems`, options)
            .then(response => response.json())
            .then(json => dispatch(setProblems(json)))
    };
}

function setProblems(problems) {
    return {
        type: FETCH_PROBLEMS,
        problems
    }
}

export const CHANGE_SOURCE_CODE = 'CHANGE_SOURCE_CODE';
export function changeSourceCode(newValue) {
    return {
        type: CHANGE_SOURCE_CODE,
        sourceCode: newValue
    }
}

export const SET_CURRENT_PROBLEM = 'SET_CURRENT_PROBLEM';
export function setCurrentProblem(problemId) {
    return {
        type: SET_CURRENT_PROBLEM,
        problemId
    }
}
