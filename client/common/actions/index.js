// @flow
import {fetchLangRanking, fetchProblemRanking, fetchRanking} from "../../ranking/actions";

type Action = { type: string, error: string }
    | { type: string, isConnected: boolean }
    | { type: string }

import * as types from "../../constants/ActionTypes"
import SockJS from "sockjs-client"
import * as Stomp from "@stomp/stompjs"
import {fetchSolvedProblemsRatio} from "../../ranking/actions/index";
import {fetchSubmissions} from "../../submissions/actions";
import Event from "../domain/Event"

import store from "../store";
import {languages} from "../../config";

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

let refreshRanking = function (event, languages) {
    console.log("Refresh rankings");
    store.dispatch(fetchRanking());
    store.dispatch(fetchProblemRanking(event.problemId));
    store.dispatch(fetchSolvedProblemsRatio());

    languages.forEach(lang => {
        store.dispatch(fetchLangRanking(lang));
    });
};

let refreshSubmissions = function (event) {
    console.log("Refresh submissions");
    store.dispatch(fetchSubmissions(event.userId));
};

export function websocketInit() {
    let socket = new SockJS("/ws/events-websocket");

    let stompClient = Stomp.over(socket);

    stompClient.connect('guest', 'guest',
        (frame) => {
            store.dispatch(websocketConnected(true));
            console.log(`Connected: ${JSON.stringify(frame)}`);

            stompClient.subscribe('/topic/events', (message) => {
                console.log(`Received: ${JSON.stringify(message)}`);
                let event: Event = JSON.parse(message.body);
                if (event.type === 'refreshRanking') {
                    refreshRanking(event, languages);
                    setTimeout(() => {
                        refreshRanking(event, languages);
                    }, 2000);
                    setTimeout(() => {
                        refreshRanking(event, languages);
                    }, 5000);
                } else if (event.type === 'refreshUserSubmissions') {
                    refreshSubmissions(event);
                    setTimeout(() => {
                        refreshSubmissions(event);
                    }, 2000);
                    setTimeout(() => {
                        refreshSubmissions(event);
                    }, 5000);
                }
            })
        },
        (error) => {
            console.log("Error: ", error);
        },
        (closeEvent) => {
            console.log(`Disconnected: ${JSON.stringify(closeEvent)}`);
            store.dispatch(websocketConnected(false));
            setTimeout(() => {
                console.log("Retrying to connect");
                websocketInit();
            }, 5000);
        }
    );
}