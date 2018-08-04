// @flow
import {fetchProblemRanking, fetchRanking, fetchRankingStartDate} from "../../ranking/actions";

type Action = { type: string, error: string }
    | { type: string, isConnected: boolean }
    | { type: string }

import * as types from "../../constants/ActionTypes"
import SockJS from "sockjs-client"
import * as Stomp from "@stomp/stompjs"
import {fetchSolvedProblemsRatio} from "../../ranking/actions/index";
import {fetchSubmissions, fetchSubmissionStats} from "../../submissions/actions";
import Event from "../domain/Event"

import {store} from "../store";
import {fetchUsers} from "../../users/actions";

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

export function updateConfig() {
    return (dispatch: Dispatch) => {

        const options = {
            headers: {
                'Accept': 'application/json'
            },
            method: 'get'
        };

        return fetch(`/config`, options)
            .then(response => response.json())
            .then(json => {
                dispatch(fetchConfig(json));
            })
            .catch((error) => console.log(`[err] GET /kv/jalgoarena/config?raw:` + error));
    };
}


function fetchConfig(config): Action {
    return {
        type: types.UPDATE_CONFIG,
        config
    };
}

export function websocketConnected(isConnected: boolean): Action {
    return {
        type: types.WEBSOCKET_CONNECTED,
        isConnected
    }
}

let refreshRanking = function (event) {
    console.log("Refresh rankings");
    store.dispatch(fetchUsers());
    store.dispatch(fetchSubmissionStats());
    store.dispatch(fetchRanking());
    store.dispatch(fetchRankingStartDate());
    store.dispatch(fetchProblemRanking(event.problemId));
    store.dispatch(fetchSolvedProblemsRatio());
};

let refreshSubmissions = function (event) {
    console.log("Refresh submissions");

    let token = localStorage.getItem('jwtToken');

    if (!token || token === '' ) {
        return null;
    }

    store.dispatch(fetchSubmissions(event.userId, token));
    store.dispatch(fetchSubmissionStats());
};

export function websocketInit() {
    let socket = new SockJS("/ws/events-websocket");

    let stompClient = Stomp.over(socket);

    stompClient.connect('guest', 'guest',
        (frame) => {
            store.dispatch(websocketConnected(true));
            console.log(`Connected: ${JSON.stringify(frame)}`);

            stompClient.subscribe('/topic/events', (message) => {
                let event: Event = JSON.parse(message.body);
                if (event.type === 'refreshRanking') {
                    refreshRanking(event);
                } else if (event.type === 'refreshUserSubmissions') {
                    refreshSubmissions(event);
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