// @flow

import rootReducer from './reducers';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';

import {checkSessionStatus} from "../users/actions";
import {fetchProblems, startFetchingProblems} from "../problems/actions"
import {fetchLangRanking, fetchRanking} from "../ranking/actions";
import {loadConfig, setErrorMessage, websocketInit} from "./actions";
import fetch from "isomorphic-fetch";

const configureStore = redux.compose(
    redux.applyMiddleware(thunk),
    DevTools.instrument()
)(redux.createStore);

const store = configureStore(rootReducer);

const options = {
    headers: {
        'Accept': 'application/json'
    },
    method: 'get'
};

fetch('/config', options)
    .then(response => response.json())
    .then(config => {
        console.log("Config: " + JSON.stringify(config, null, 2));
        websocketInit(config);
        store.dispatch(loadConfig(config));
        store.dispatch(startFetchingProblems());
        store.dispatch(fetchProblems());
        store.dispatch(checkSessionStatus());
        store.dispatch(fetchRanking());

        config.languages.forEach(lang => {
            store.dispatch(fetchLangRanking(lang));
        });
    })
    .catch(() => dispatch(setErrorMessage("Cannot retrieve config")));


export default store;
