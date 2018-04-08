// @flow
type Action = {
    type: string,
    solvedProblemsRatio?: Array<ProblemSubmissionRatio>,
    submissions?: Array<Submission>
}

import fetch from 'isomorphic-fetch';
import config from '../../config';
import * as types from "../../constants/ActionTypes"
import {setErrorMessage} from "../../common/actions/index";
import {ProblemSubmissionRatio} from "../domain/ProblemSubmissionRatio";
import {Submission} from "../domain/Submission";

const SUBMISSIONS_SERVER_URL: string = `${config.jalgoarenaApiUrl}/submissions/api`;


export function fetchSubmissions(userId: string) {

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '') {
        return null;
    }

    const options = {
        headers: {
            'Accept': 'application/json',
            'X-Authorization': token
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`${SUBMISSIONS_SERVER_URL}/submissions/${userId}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Submissions Service"))
                } else {
                    dispatch(setSubmissions(json))
                }
            })
            .catch(error => dispatch(setErrorMessage("Cannot connect to Submissions Service")));
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
