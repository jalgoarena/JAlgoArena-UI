import fetch from 'isomorphic-fetch';
import config from '../config';
import * as types from "../constants/ActionTypes"

const JUDGE_SERVER_URL = config.jalgoarenaApiUrl + "/judge/api";
const PROBLEMS_SERVER_URL = config.jalgoarenaApiUrl + "/problems/api";
const SUBMISSIONS_SERVER_URL = config.jalgoarenaApiUrl + "/submissions/api";


export function closeWorkInProgressWindow() {
    return {
        type: types.CLOSE_WORK_IN_PROGRESS_WINDOW
    };
}

export function startJudge() {
    return {
        type: types.START_JUDGE
    };
}

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
        type: types.JUDGE_RESULT_RECEIVED,
        result: Object.assign({sourceCode: sourceCode, problemId: problemId}, result)
    }
}

export function startFetchingProblems() {
    return {
        type: types.START_FETCHING_PROBLEMS
    };
}

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
        type: types.FETCH_PROBLEMS,
        problems
    }
}

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

export function fetchProblemRanking(problemId) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/ranking/${problemId}`, options)
            .then(response => response.json())
            .then(json => dispatch(setProblemRanking(json)))
            .catch(error => console.log(error));
    };
}

function setProblemRanking(problemRanking) {
    return {
        type: types.FETCH_PROBLEM_RANKING,
        problemRanking
    }
}

export function fetchRanking() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/ranking/`, options)
            .then(response => response.json())
            .then(json => dispatch(setRanking(json)))
            .catch(error => console.log(error));
    };
}

function setRanking(ranking) {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}

export function changeSourceCode(newValue) {
    return {
        type: types.CHANGE_SOURCE_CODE,
        sourceCode: newValue
    }
}

export function problemRefresh() {
    return {
        type: types.PROBLEM_REFRESH
    }
}

export function setCurrentProblem(problemId) {
    return {
        type: types.SET_CURRENT_PROBLEM,
        problemId
    }
}

export function setSubmissionsFilter(status) {
    return {
        type: types.SET_SUBMISSIONS_FILTER,
        status
    }
}

export function setCurrentProblemsFilter(level) {
    return {
        type: types.SET_CURRENT_PROBLEMS_FILTER,
        level
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

export function changeActualLanguage(language) {
    return {
        type: types.CHANGE_PROGRAMMING_LANGUAGE,
        programmingLanguage: language
    }
}

export function hideDoneProblems(value) {
    return {
        type: types.HIDE_DONE_PROBLEMS,
        hideDoneProblems: value
    }
}

export function createProblem(problem) {
    return dispatch => {

        let token = localStorage.getItem('jwtToken');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            method: 'put',
            body: JSON.stringify(problem)
        };

        return fetch(`${PROBLEMS_SERVER_URL}/problems`, options)
            .then(response => response.json())
            .then(json => {
                console.log(`problem saved: ${json.id}`);
                dispatch(problemCreated())
            })
            .catch(error => console.log(error));
    };
}

function problemCreated() {
    return {
        type: types.CREATE_PROBLEM
    }
}