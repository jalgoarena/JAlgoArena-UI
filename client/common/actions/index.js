import * as types from "../../constants/ActionTypes"

export function closeWorkInProgressWindow() {
    return {
        type: types.CLOSE_WORK_IN_PROGRESS_WINDOW
    };
}

export function setErrorMessage(error) {
    return {
        type: types.SET_ERROR_MESSAGE,
        error: error
    }
}

export function clearErrorMessage() {
    return {
        type: types.RESET_ERROR_MESSAGE
    }
}