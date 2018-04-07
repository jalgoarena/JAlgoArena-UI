// @flow
type Action = {type:string}
    | {type:string, problemRanking: Array<ProblemRankingEntry>}
    | {type:string, ranking:Array<RankingEntry>}

import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";

const RANKING_SERVER_URL: string = `${config.jalgoarenaApiUrl}/ranking/api`;

export function fetchProblemRanking(problemId: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`${RANKING_SERVER_URL}/ranking/${problemId}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setProblemRanking((json: Array<ProblemRankingEntry>)))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setProblemRanking(problemRanking: Array<ProblemRankingEntry>): Action {
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

    return (dispatch: Dispatch) => {
        return fetch(`${RANKING_SERVER_URL}/ranking/`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setRanking((json: Array<RankingEntry>)))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setRanking(ranking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}