import * as redux from 'redux';
import * as types from '../../constants/ActionTypes';
import {editor, EditorState, problems, ProblemsState} from '../../problems/reducers/index';
import {auth, AuthState} from '../../users/reducers/index';
import {ranking, RankingState} from '../../ranking/reducers/index';
import {submissions, SubmissionsState} from '../../submissions/reducers/index';
import { LOCATION_CHANGE } from 'connected-react-router';

interface Action {
    type: string;
    isConnected?: boolean;
    error?: string;
    config?: { title: string; emailRegex: string; emailErrorMessage: string; teams: string[]; regions: string[] };
}

export interface Config {
    title: string
    emailRegex: string
    emailErrorMessage: string
    teams: Array<string>
    regions: Array<string>
}

export interface AppState {
    editor: EditorState
    problems: ProblemsState
    auth: AuthState
    submissions: SubmissionsState
    ranking: RankingState
    errorMessage: string | undefined | null
    webSocketConnected: boolean
    config: Config
}

const rootReducer = redux.combineReducers({
  editor,
  problems,
  auth,
  submissions,
  ranking,
  errorMessage,
  webSocketConnected,
  config,
});

export function webSocketConnected(state: boolean = false, action: Action) {
  switch (action.type) {
    case types.WEBSOCKET_CONNECTED:
      return action.isConnected;
    default:
      return state;
  }
}

export function config(
  state: {} = {
    title: 'Start to solve your first problem',
    emailRegex: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    emailErrorMessage: 'Please enter a valid email address',
    teams: ['Team A', 'Team B', 'Team C'],
    regions: ['Kraków', 'Wrocław'],
  },
  action: Action,
) {
  switch (action.type) {
    case types.UPDATE_CONFIG:
      return action.config;
    default:
      return state;
  }
}

export function errorMessage(
    state: string | undefined | null = null,
    action: { type: string; error: string | null }
) {
  const { type, error } = action;

  if (type === types.RESET_ERROR_MESSAGE || type === LOCATION_CHANGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
}

export {rootReducer};
