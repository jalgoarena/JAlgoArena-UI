import fetch from 'isomorphic-fetch';

export const SUBMISSION_RESULT_RECEIVED = 'SUBMISSION_RESULT_RECEIVED';
export function sendSubmission(sourceCode, problemId) {

    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        method: 'post',
        body: sourceCode
    };

    return dispatch => {
        return fetch(`http://localhost:8080/problems/${problemId}/submit`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissionResult(json)))
    };
}

function setSubmissionResult(result) {
    return {
        type: SUBMISSION_RESULT_RECEIVED,
        result
    }
}

export const SHOW_MODAL = 'SHOW_MODAL';
export function showModal(title) {
    return {
        type: SHOW_MODAL,
        title,
        showModal: true
    };
}
export function hideModal() {
    return {
        type: SHOW_MODAL,
        showModal: false
    }
}

export const FETCH_PROBLEMS = 'FETCH_PROBLEMS';
export function fetchProblems() {
    //TODO: use fetch to take asynchronously data
}

export const CHANGE_SOURCE_CODE = 'CHANGE_SOURCE_CODE';
export function changeSourceCode(newValue) {
    return {
        type: CHANGE_SOURCE_CODE,
        sourceCode: newValue
    }
}


export const RESET_SOURCE_CODE = 'RESET_SOURCE_CODE';
export function resetSourceCode() {
    return {
        type: RESET_SOURCE_CODE
    }
}
