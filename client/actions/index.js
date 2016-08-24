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
            .then(json => dispatch(judgeResultReceived(json, sourceCode, problemId)))
            .catch(error => console.log(error));
    };
}

function judgeResultReceived(result, sourceCode, problemId) {
    return {
        type: JUDGE_RESULT_RECEIVED,
        result: Object.assign({sourceCode: sourceCode, problemId: problemId}, result)
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
            .catch(error => console.log(error));
    };
}

function setProblems(problems) {
    return {
        type: FETCH_PROBLEMS,
        problems
    }
}

export const FETCH_SUBMISSIONS = 'FETCH_SUBMISSIONS';
export function fetchSubmissions(userId) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`/submissions/${userId}`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissions(json)))
            .catch(error => console.log(error));
    };
}

function setSubmissions(submissions) {
    return {
        type: FETCH_SUBMISSIONS,
        submissions
    }
}

export const FETCH_RANKING = 'FETCH_RANKING';
export function fetchRanking() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`/ranking/`, options)
            .then(response => response.json())
            .then(json => dispatch(setRanking(json)))
            .catch(error => console.log(error));
    };
}

function setRanking(ranking) {
    return {
        type: FETCH_RANKING,
        ranking
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

export const SUBMISSION_SAVED = 'SUBMISSION_SAVED';
export function sendSubmission(result, userId) {

    return dispatch => {

        let token = localStorage.getItem('jwtToken');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: 'post',
            body: JSON.stringify({
                result: result,
                userId: userId
            })
        };

        return fetch(`/submissions`, options)
            .then(response => response.json())
             .then(json => {
                dispatch(submissionSaved(json));
                dispatch(fetchSubmissions(userId));
                dispatch(fetchRanking());
            })
            .catch(error => console.log(error));
    };
}

function submissionSaved(submissions) {
    return {
        type: SUBMISSION_SAVED,
        submissions
    }
}
