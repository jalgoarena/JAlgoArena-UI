import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";

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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setProblemRanking(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
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
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setRanking(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
    };
}

function setRanking(ranking) {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}