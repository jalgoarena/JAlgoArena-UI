import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {fetchRanking} from "../../ranking/actions";
import {setErrorMessage} from "../../common/actions/index";

const JUDGE_SERVER_URL = config.jalgoarenaApiUrl + "/judge/api";
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

export function rerunSubmission(sourceCode, userId, problemId, language) {
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
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Judge Service"))
                } else {
                    let result = Object.assign({sourceCode: sourceCode, problemId: problemId}, json);

                    if (result.statusCode === 'ACCEPTED') {
                        result = Object.assign({}, result, {statusCode: 'RERUN_ACCEPTED'});
                    }

                    dispatch(sendSubmission(result, userId, {id: problemId}, language, true));
                    dispatch(fetchAllSubmissions());
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Judge Service")));
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
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(submissionSaved([json]));
                    if (isForAll) {
                        dispatch(fetchAllSubmissions());
                    } else {
                        dispatch(fetchSubmissions(userId));
                    }
                    dispatch(fetchRanking());
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
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

