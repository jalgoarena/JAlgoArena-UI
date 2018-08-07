// @flow
import {ProblemSubmissionRatio} from "../../submissions/domain/ProblemSubmissionRatio";
import * as types from "../../constants/ActionTypes"
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";
import {setErrorMessage} from "../../common/actions";

type Action = {type:string}
    | {type:string, problemRanking: Array<ProblemRankingEntry>}
    | {type:string, ranking:Array<RankingEntry>}

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
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: \n" + JSON.stringify(json.error)))
                } else {
                    dispatch(setProblemRanking((json: Array<ProblemRankingEntry>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/problem/${problemId}:` + error));
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
        return fetch(`/api/ranking/api/ranking/`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setRanking((json: Array<RankingEntry>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/:` + error));
    };
}

function setRanking(ranking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}

export function fetchPreviousRanking(date: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/${date}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setPreviousRanking((json: Array<RankingEntry>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/${date}:` + error));
    };
}

function setPreviousRanking(previousRanking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_PREVIOUS_RANKING,
        previousRanking
    }
}

export function fetchRankingStartDate() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/startDate`, options)
            .then(response => {
                if (/\d\d\d\d-\d\d-\d\d/.test(response.body)) {
                    dispatch(setRankingStartDate((response.body: string)));
                } else {
                    dispatch(setErrorMessage("Incorrect format of a date: " + response.body))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/startDate:` + error));
    };
}

function setRankingStartDate(startDate: string): Action {
    return {
        type: types.FETCH_RANKING_START_DATE,
        startDate
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
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setSolvedProblemsRatio((json: Array<ProblemSubmissionRatio>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/solved-ratio:` + error));
    };
}

function setSolvedProblemsRatio(solvedProblemsRatio: Array<ProblemSubmissionRatio>): Action {
    return {
        type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
        solvedProblemsRatio
    }
}