import fetch from 'isomorphic-fetch';
import config from '../config';

const JUDGE_SERVER_URL = config.judgeServerUrl;
const DATA_SERVER_URL = config.dataServerUrl;

export const CLOSE_WORK_IN_PROGRESS_WINDOW = 'CLOSE_WORK_IN_PROGRESS_WINDOW';
export function closeWorkInProgressWindow() {
    return {
        type: CLOSE_WORK_IN_PROGRESS_WINDOW
    };
}

export const START_JUDGE = 'START_JUDGE';
export function startJudge() {
    return {
        type: START_JUDGE
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

export const JUDGE_RESULT_RECEIVED = 'JUDGE_RESULT_RECEIVED';
function judgeResultReceived(result, sourceCode, problemId) {
    return {
        type: JUDGE_RESULT_RECEIVED,
        result: Object.assign({sourceCode: sourceCode, problemId: problemId}, result)
    }
}

export const START_FETCHING_PROBLEMS = 'START_FETCHING_PROBLEMS';
export function startFetchingProblems() {
    return {
        type: START_FETCHING_PROBLEMS
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
        return fetch(`${DATA_SERVER_URL}/submissions/${userId}`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissions(json)))
            .catch(error => console.log(error));
    };
}

export function fetchAllSubmissions() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${DATA_SERVER_URL}/submissions/`, options)
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

export const FETCH_PROBLEM_RANKING = 'FETCH_PROBLEM_RANKING';
export function fetchProblemRanking(problemId) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${DATA_SERVER_URL}/ranking/${problemId}`, options)
            .then(response => response.json())
            .then(json => dispatch(setProblemRanking(json)))
            .catch(error => console.log(error));
    };
}

function setProblemRanking(problemRanking) {
    return {
        type: FETCH_PROBLEM_RANKING,
        problemRanking
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
        return fetch(`${DATA_SERVER_URL}/ranking/`, options)
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

export const PROBLEM_REFRESH = 'PROBLEM_REFRESH';
export function problemRefresh() {
    return {
        type: PROBLEM_REFRESH
    }
}

export const SET_CURRENT_PROBLEM = 'SET_CURRENT_PROBLEM';
export function setCurrentProblem(problemId) {
    return {
        type: SET_CURRENT_PROBLEM,
        problemId
    }
}

export const SET_CURRENT_PROBLEMS_FILTER = 'SET_CURRENT_PROBLEMS_FILTER';
export function setCurrentProblemsFilter(level) {
    return {
        type: SET_CURRENT_PROBLEMS_FILTER,
        level
    }
}

export const START_SUBMISSION = 'START_SUBMISSION';
export function startSubmission() {
    return {
        type: START_SUBMISSION
    };
}

export const SUBMISSION_SAVED = 'SUBMISSION_SAVED';
export function sendSubmission(result, userId, problem) {

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
                problemId: problem.id,
                level: problem.level,
                elapsed_time: result.elapsed_time,
                sourceCode: result.sourceCode,
                userId: userId
            })
        };

        return fetch(`${DATA_SERVER_URL}/submissions`, options)
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
