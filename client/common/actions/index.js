// @flow
type Action = {type: string, error: string}
    | {type:string}

import * as types from "../../constants/ActionTypes"

export function closeWorkInProgressWindow(): Action {
    return {
        type: types.CLOSE_WORK_IN_PROGRESS_WINDOW
    };
}

export function setErrorMessage(error: string): Action {
    return {
        type: types.SET_ERROR_MESSAGE,
        error: error
    }
}

export function clearErrorMessage(): Action {
    return {
        type: types.RESET_ERROR_MESSAGE
    }
}