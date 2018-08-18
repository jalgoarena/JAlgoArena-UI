import {Dispatch} from "redux";

import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import {ProblemSubmissionRatio} from "../domain/ProblemSubmissionRatio";
import {Submission} from "../domain/Submission";

interface Action {
    type: string
    solvedProblemsRatio?: Array<ProblemSubmissionRatio>
    submissions?: Array<Submission>
    status?: string
    stats?: Array<{}>
}

export function fetchSubmissions(userId: string | null, token: string | null) {

    const options = {
        headers: {
            'Accept': 'application/json',
            'X-Authorization': token || ""
        },
        method: 'get'
    };

    return (dispatch: Dispatch<any>) => {
        return fetch(`/api/submissions/api/submissions/${userId}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setSubmissions(json))
                }
            })
            .catch((error) => console.log(`[err] GET /api/submissions/api/submissions/${userId}: ` + error));
    };
}

function setSubmissions(submissions: Array<Submission>): Action {
    return {
        type: types.FETCH_SUBMISSIONS,
        submissions
    }
}

export function setSubmissionsFilter(status: string): Action {
    return {
        type: types.SET_SUBMISSIONS_FILTER,
        status
    }
}

export function fetchSubmissionStats() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch<any>) => {
        return fetch(`/api/submissions/api/submissions/stats`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setSubmissionsStats(json))
                }
            })
            .catch((error) => console.log(`[err] GET /api/submissions/api/submissions/stats: ` + error));
    };
}

function setSubmissionsStats(stats: Array<{}>): Action {
    return {
        type: types.FETCH_SUBMISSIONS_STATS,
        stats
    }
}
