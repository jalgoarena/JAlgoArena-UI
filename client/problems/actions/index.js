import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"

const JUDGE_SERVER_URL = config.jalgoarenaApiUrl + "/judge/api";

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

export function setCurrentProblemsFilter(level) {
    return {
        type: types.SET_CURRENT_PROBLEMS_FILTER,
        level
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

export function startFetchingProblems() {
    return {
        type: types.START_FETCHING_PROBLEMS
    };
}