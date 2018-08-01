import rootReducer from './reducers';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import {createHashHistory} from 'history';

import {connectRouter, routerMiddleware} from 'connected-react-router';


import {checkSessionStatus, fetchUsers} from "../users/actions";
import {fetchProblems, startFetchingProblems} from "../problems/actions"
import {fetchRanking} from "../ranking/actions";
import {updateConfig, websocketInit} from "./actions";
import {fetchSubmissionStats} from "../submissions/actions";

const history = createHashHistory();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);

websocketInit();
store.dispatch(updateConfig());
store.dispatch(startFetchingProblems());
store.dispatch(fetchProblems());
store.dispatch(fetchUsers());
store.dispatch(fetchSubmissionStats());
store.dispatch(checkSessionStatus());
store.dispatch(fetchRanking());

export {store, history};
