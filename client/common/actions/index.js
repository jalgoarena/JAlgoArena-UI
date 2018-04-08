// @flow
import {fetchProblemRanking, fetchRanking} from "../../ranking/actions";

type Action = {type: string, error: string}
    | {type: string, isConnected: boolean}
    | {type:string}

import * as types from "../../constants/ActionTypes"
import SockJS from "sockjs-client"
import * as Stomp from "@stomp/stompjs"
import {fetchSolvedProblemsRatio} from "../../ranking/actions/index";
import {fetchSubmissions} from "../../submissions/actions";
import config from "../../config";
import Event from "../domain/Event"

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

export function websocketConnected(isConnected: boolean): Action {
    return {
        type: types.WEBSOCKET_CONNECTED,
        isConnected
    }
}

export function websocketInit(store) {
    let socket = new SockJS(config.jalgoarenaWebSocketUrl + "/events-websocket");
    let stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        store.dispatch(websocketConnected(true));
        console.log("Connected: " + frame);
        stompClient.subscribe('/topic/events', (message) => {
            let event: Event = JSON.parse(message.body);
            if (event.type === 'refreshRanking') {
                store.dispatch(fetchRanking());
                store.dispatch(fetchProblemRanking(event.problemId));
                store.dispatch(fetchSolvedProblemsRatio());
            } else if (event.type === 'refreshUserSubmissions') {
                store.dispatch(fetchSubmissions(event.userId));
            }
        })
    });
}