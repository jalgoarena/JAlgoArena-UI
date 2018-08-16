// @flow
type Action = {
    type:string,
    isConnected?: boolean,
    error?: string,
    config?: {title: string, emailRegex: string, emailErrorMessage: string, teams: Array<string>, regions: Array<string>}
}

import * as redux from 'redux';
import * as types from "../../constants/ActionTypes";

import {editor, problems} from "../../problems/reducers";
import {auth} from "../../users/reducers/index";
import {ranking} from "../../ranking/reducers";
import {submissions} from "../../submissions/reducers";

import {LOCATION_CHANGE} from 'connected-react-router'

const rootReducer = redux.combineReducers({
    editor,
    problems,
    auth,
    submissions,
    ranking,
    errorMessage,
    webSocketConnected,
    config
});

export function webSocketConnected(state: boolean = false, action: Action) {
    switch (action.type) {
        case types.WEBSOCKET_CONNECTED:
            return action.isConnected;
        default:
            return state;
    }
}

export function config(state: {} = {
    title: "Start to solve your first problem",
    emailRegex: "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$",
    emailErrorMessage: "Please enter a valid email address",
    teams: ["Team A", "Team B", "Team C"],
    regions: ["Kraków", "Wrocław"]
}, action: Action) {
    switch (action.type) {
        case types.UPDATE_CONFIG:
            return action.config;
        default:
            return state;
    }
}

export function errorMessage(state: ?string = null, action: {type:string, error: ?string}) {
    const { type, error } = action;

    if (type === types.RESET_ERROR_MESSAGE || type === LOCATION_CHANGE) {
        return null;
    } else if (error) {
        return error;
    }

    return state;
}

export default rootReducer;