import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"

const JUDGE_SERVER_URL = config.jalgoarenaApiUrl + "/judge/api";
const SUBMISSIONS_SERVER_URL = config.jalgoarenaApiUrl + "/submissions/api";

export function fetchSubmissions(userId) {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return;
    }

    const options = {
        headers: {
            'Accept': 'application/json',
            'X-Authorization': token
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/${userId}`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissions(json)))
            .catch(error => console.log(error));
    };
}

export function fetchAllSubmissions() {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return;
    }

    const options = {
        headers: {
            'Accept': 'application/json',
            'X-Authorization': token
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissions(json)))
            .catch(error => console.log(error));
    };
}

function setSubmissions(submissions) {
    return {
        type: types.FETCH_SUBMISSIONS,
        submissions
    }
}



export function setSubmissionsFilter(status) {
    return {
        type: types.SET_SUBMISSIONS_FILTER,
        status
    }
}

export function rerunSubmission(sourceCode, userId, problemId, problemLevel, language) {
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
            .then(json => {
                let result = Object.assign({sourceCode: sourceCode, problemId: problemId}, json);

                if (result.statusCode === 'ACCEPTED') {
                    result = Object.assign({}, result, {statusCode: 'RERUN_ACCEPTED'});
                }

                dispatch(sendSubmission(result, userId, {id: problemId, level: problemLevel}, language, true));
                dispatch(fetchAllSubmissions());
            })
            .catch(error => console.log(error));
    };

}

export function startSubmission() {
    return {
        type: types.START_SUBMISSION
    };
}

export function sendSubmission(result, userId, problem, activeLanguage, isForAll) {

    return dispatch => {

        let token = localStorage.getItem('jwtToken');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            method: 'put',
            body: JSON.stringify({
                problemId: problem.id,
                level: problem.level,
                elapsedTime: result.elapsedTime,
                sourceCode: result.sourceCode,
                statusCode: result.statusCode,
                userId: userId,
                language: activeLanguage
            })
        };

        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions`, options)
            .then(response => response.json())
            .then(json => {
                dispatch(submissionSaved(json));
                if (isForAll) {
                    dispatch(fetchAllSubmissions());
                } else {
                    dispatch(fetchSubmissions(userId));
                }
                dispatch(fetchRanking());
            })
            .catch(error => console.log(error));
    };
}

function submissionSaved(submissions) {
    return {
        type: types.SUBMISSION_SAVED,
        submissions
    }
}

export function deleteSubmission(submissionId) {
    return dispatch => {

        let token = localStorage.getItem('jwtToken');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            method: 'delete',
            body: JSON.stringify({})
        };

        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/${submissionId}`, options)
            .then(response => response.json())
            .then(json => dispatch(refreshSubmissions(json)))
            .catch(error => console.log(error));
    };
}

function refreshSubmissions(submissions) {
    return {
        type: types.DELETE_SUBMISSION,
        submissions
    }
}

