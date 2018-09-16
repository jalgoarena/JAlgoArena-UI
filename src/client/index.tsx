import {updateConfig, websocketInit} from "./common/actions";

import "@babel/polyfill";
require('es6-promise').polyfill();

import 'isomorphic-fetch';
import * as ReactDOM from 'react-dom'
import Router from './router';

import './assets/app.css';
import {fetchProblems, startFetchingProblems} from "./problems/actions";
import {checkSessionStatus, fetchUsers} from "./users/actions";
import {fetchSubmissionStats} from "./submissions/actions";
import {fetchRanking, fetchRankingStartDate} from "./ranking/actions";
import {store} from "./common";

ReactDOM.render(
    Router,
    document.getElementById('app')
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