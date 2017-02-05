// @flow
type Action = {
    type: string,
    solvedProblemsRatio?: Array<ProblemSubmissionRatio>,
    submissions?: Array<Submission>
}

import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import {ProblemSubmissionRatio} from "../domain/ProblemSubmissionRatio";
import {Submission} from "../domain/Submission";

const SUBMISSIONS_SERVER_URL: string = `${config.jalgoarenaApiUrl}/submissions/api`;

export function fetchSolvedProblemsRatio() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/solved-ratio`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setSolvedProblemsRatio((json: Array<ProblemSubmissionRatio>)))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function setSolvedProblemsRatio(solvedProblemsRatio: Array<ProblemSubmissionRatio>): Action {
    return {
        type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
        solvedProblemsRatio
    }
}

export function fetchSubmissions(userId: string) {

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

    return (dispatch: Dispatch) => {
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

    return (dispatch: Dispatch) => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"));
                } else {
                    dispatch(setSubmissions((json: Array<Submission>)));
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function setSubmissions(submissions: Array<Submission>): Action {
    return {
        type: types.FETCH_SUBMISSIONS,
        submissions
    }
}

export function setSubmissionsFilter(status: string): Action {
    return {
        type: types.SET_SUBMISSIONS_FILTER,
        status
    }
}

export function deleteSubmission(submissionId: string) {
    return (dispatch: Dispatch) => {

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
                    dispatch(refreshSubmissions((json: Array<Submission>)))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function refreshSubmissions(submissions: Array<Submission>): Action {
    return {
        type: types.DELETE_SUBMISSION,
        submissions
    }
}

