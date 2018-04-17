// @flow
import {ProblemSubmissionRatio} from "../../submissions/domain/ProblemSubmissionRatio";
import fetch from 'isomorphic-fetch';
import * as types from "../../constants/ActionTypes"
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";
import {setErrorMessage} from "../../common/actions";

type Action = {type:string}
    | {type:string, problemRanking: Array<ProblemRankingEntry>}
    | {type:string, ranking:Array<RankingEntry>, lang?: string}

export function fetchProblemRanking(problemId: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/problem/${problemId}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setProblemRanking((json: Array<ProblemRankingEntry>)))
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setProblemRanking(problemRanking: Array<ProblemRankingEntry>): Action {
    return {
        type: types.FETCH_PROBLEM_RANKING,
        problemRanking
    }
}

export function fetchLangRanking(lang: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/language/${lang}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setLangRanking((json: Array<RankingEntry>), lang))
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setLangRanking(ranking: Array<RankingEntry>, lang: string): Action {
    return {
        type: types.FETCH_LANG_RANKING,
        ranking: ranking,
        lang
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
        return fetch(`/api/ranking/api/ranking/`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setRanking((json: Array<RankingEntry>)))
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setRanking(ranking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}

export function fetchSolvedProblemsRatio() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/solved-ratio`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service"))
                } else {
                    dispatch(setSolvedProblemsRatio((json: Array<ProblemSubmissionRatio>)))
                }
            })
            .catch(() => dispatch(setErrorMessage("Cannot connect to Ranking Service")));
    };
}

function setSolvedProblemsRatio(solvedProblemsRatio: Array<ProblemSubmissionRatio>): Action {
    return {
        type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
        solvedProblemsRatio
    }
}