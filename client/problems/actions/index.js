import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";

const JUDGE_SERVER_URL = config.jalgoarenaApiUrl + "/judge/api";
const PROBLEMS_SERVER_URL = config.jalgoarenaApiUrl + "/problems/api";

export function startJudge() {
    return {
        type: types.JUDGE_REQUEST
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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Judge Service"));
                } else {
                    dispatch(judgeResultReceived(json, sourceCode, problemId))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Judge Service")));
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

export function setProblemsDifficultyVisibilityFilter(level) {
    return {
        type: types.SET_PROBLEMS_DIFFICULTY_VISIBILITY_FILTER,
        level
    }
}

export function changeCurrentProgrammingLanguage(language) {
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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Judge Service"));
                } else {
                    dispatch(setProblems(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Judge Service")));
    };
}

function setProblems(problems) {
    return {
        type: types.FETCH_PROBLEMS_SUCCESS,
        problems
    }
}

export function startFetchingProblems() {
    return {
        type: types.FETCH_PROBLEMS_REQUEST
    };
}

export function fetchRawProblems() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`${PROBLEMS_SERVER_URL}/problems`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Problems Service"));
                } else {
                    dispatch(setRawProblems(json));
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Problems Service")));
    };
}

function setRawProblems(rawProblems) {
    return {
        type: types.FETCH_RAW_PROBLEMS,
        rawProblems
    }
}