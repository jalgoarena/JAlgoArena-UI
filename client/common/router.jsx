// @flow

import React from "react";
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import RankPage from "../ranking/pages/rank";
import ProfilePage from "../users/pages/profile";
import ProblemPage from "../problems/pages/problem";
import ProblemsPage from "../problems/pages/problems";
import LoginPage from "../users/pages/login"
import SignUpPage from "../users/pages/signup";
import ProblemRankPage from '../ranking/pages/problemRank';
import SubmissionsAdminPage from "../submissions/pages/admin";
import ProblemsAdminPage from "../problems/pages/admin";
import UsersAdminPage from "../users/pages/admin";
import SubmissionsPage from "../submissions/pages/submissions";

import {Layout} from './layout';
import Home from "./pages/home";
import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path="/" component={Home} />
                <Route path="/problems" component={ProblemsPage} />
                <Route path="/leaderboard" component={RankPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/problem/:id" component={ProblemPage} />
                <Route path="/problem/:id/rank" component={ProblemRankPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/submissions" component={SubmissionsPage} />
                <Route path="/submissionsAdmin" component={SubmissionsAdminPage} />
                <Route path="/problemsAdmin" component={ProblemsAdminPage} />
                <Route path="/usersAdmin" component={UsersAdminPage} />
            </Route>
        </Router>
    </Provider>
);
