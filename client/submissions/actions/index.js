import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";

const SUBMISSIONS_SERVER_URL = config.jalgoarenaApiUrl + "/submissions/api";

export function fetchSolvedProblemsRatio() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/solved-ratio`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setSolvedProblemsRatio(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function setSolvedProblemsRatio(solvedProblemsRatio) {
    return {
        type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
        solvedProblemsRatio
    }
}

export function fetchSubmissions(userId) {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return null;
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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setSubmissions(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

export function fetchAllSubmissions() {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return null;
    }

    const options = {
        headers: {
            'Accept': 'application/json',
            'X-Authorization': token
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"));
                } else {
                    dispatch(setSubmissions(json));
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(refreshSubmissions(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function refreshSubmissions(submissions) {
    return {
        type: types.DELETE_SUBMISSION,
        submissions
    }
}

