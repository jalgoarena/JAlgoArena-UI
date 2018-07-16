import rootReducer from './reducers';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import {createHashHistory} from 'history';

import {connectRouter, routerMiddleware} from 'connected-react-router';


import {checkSessionStatus} from "../users/actions";
import {fetchProblems, startFetchingProblems} from "../problems/actions"
import {fetchRanking} from "../ranking/actions";
import {websocketInit} from "./actions";

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
store.dispatch(startFetchingProblems());
store.dispatch(fetchProblems());
store.dispatch(checkSessionStatus());
store.dispatch(fetchRanking());

export {store, history};
