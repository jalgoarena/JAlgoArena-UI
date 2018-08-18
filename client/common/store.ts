import {rootReducer} from './reducers';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import {createHashHistory} from 'history';

import {connectRouter, routerMiddleware} from 'connected-react-router';


import {checkSessionStatus, fetchUsers} from "../users/actions";
import {fetchProblems, startFetchingProblems} from "../problems/actions"
import {fetchRanking, fetchRankingStartDate} from "../ranking/actions";
import {updateConfig, websocketInit} from "./actions";
import {fetchSubmissionStats} from "../submissions/actions";

const history = createHashHistory();

const composeEnhancers =
    typeof window === 'object' &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        // @ts-ignore
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
store.dispatch<any>(updateConfig());
store.dispatch(startFetchingProblems());
store.dispatch<any>(fetchProblems());
store.dispatch<any>(fetchUsers());
store.dispatch<any>(fetchSubmissionStats());
store.dispatch<any>(fetchRanking());
store.dispatch<any>(fetchRankingStartDate());
store.dispatch<any>(checkSessionStatus());

export {store, history};
