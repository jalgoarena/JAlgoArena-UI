import { fetchRanking, startRankingRefresh } from '../../ranking/actions/index';
import * as types from '../../constants/ActionTypes';
import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { fetchSolvedProblemsRatio } from '../../ranking/actions/index';
import { fetchSubmissions, fetchSubmissionStats } from '../../submissions/actions/index';
import { Event } from '../domain/Event';
import { store } from '../store';
import { fetchUsers } from '../../users/actions/index';
import {Dispatch} from "redux";

type Action = { type: string; error: string } | { type: string; isConnected: boolean } | { type: string; config: object } | { type: string };

export function setErrorMessage(error: string): Action {
  return {
    type: types.SET_ERROR_MESSAGE,
    error: error,
  };
}

export function clearErrorMessage(): Action {
  return {
    type: types.RESET_ERROR_MESSAGE,
  };
}

export function updateConfig() {
  return (dispatch: Dispatch<Action>) => {
    const options = {
      headers: {
        Accept: 'application/json',
      },

      method: 'get',
    };

    return fetch(`/config`, options)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchConfig(json));
      })
      .catch((error) => console.log(`[err] GET /config:` + error));
  };
}

function fetchConfig(config: object): Action {
  return {
    type: types.UPDATE_CONFIG,
    config,
  };
}

export function websocketConnected(isConnected: boolean): Action {
  return {
    type: types.WEBSOCKET_CONNECTED,
    isConnected,
  };
}

let refreshRanking = function() {
  let refreshInProgress = store.getState().ranking.refreshInProgress;

  if (refreshInProgress) {
    return;
  }

  store.dispatch<any>(startRankingRefresh());
  store.dispatch<any>(fetchUsers());
  store.dispatch<any>(fetchRanking());
  store.dispatch<any>(fetchSolvedProblemsRatio());
};

let refreshSubmissions = function(event: Event) {
  let token = localStorage.getItem('jwtToken');

  if (!token || token === '') {
    return null;
  }

  let user = store.getState().auth.user;

  if (!user || event.userId !== user.id) {
    return;
  }

  store.dispatch<any>(fetchSubmissions(event.userId, token));
  store.dispatch<any>(fetchSubmissionStats());
};

export function websocketInit() {
  let socket = new SockJS('/ws/events-websocket');

  let stompClient = Stomp.over(socket);

  stompClient.connect(
    'guest',
    'guest',
    (frame) => {
      store.dispatch(websocketConnected(true));
      console.log(`Connected: ${JSON.stringify(frame)}`);

      stompClient.subscribe('/topic/events', (message) => {
        let event: Event = JSON.parse(message.body);
        if (event.type === 'refreshRanking') {
          refreshRanking();
        } else if (event.type === 'refreshUserSubmissions') {
          refreshSubmissions(event);
        }
      });
    },
    (error) => {
      console.log('Error: ', error);
    },
    (closeEvent) => {
      console.log(`Disconnected: ${JSON.stringify(closeEvent)}`);
      store.dispatch(websocketConnected(false));
      setTimeout(() => {
        console.log('Retrying to connect');
        websocketInit();
      }, 5000);
    },
  );
}
