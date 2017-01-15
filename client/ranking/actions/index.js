import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"

const SUBMISSIONS_SERVER_URL = config.jalgoarenaApiUrl + "/submissions/api";

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