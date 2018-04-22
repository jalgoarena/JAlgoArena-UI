// @flow

import rootReducer from './reducers';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';

import {checkSessionStatus} from "../users/actions";
import {fetchProblems, startFetchingProblems} from "../problems/actions"
import {fetchLangRanking, fetchRanking} from "../ranking/actions";
import {websocketInit} from "./actions";
import {languages} from "../config";

const configureStore = redux.compose(
    redux.applyMiddleware(thunk),
    DevTools.instrument()
)(redux.createStore);

const store = configureStore(rootReducer);

websocketInit();
store.dispatch(startFetchingProblems());
store.dispatch(fetchProblems());
store.dispatch(checkSessionStatus());
store.dispatch(fetchRanking());

languages.forEach(lang => {
    store.dispatch(fetchLangRanking(lang));
});


export default store;
