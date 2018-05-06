// @flow

import React from "react";
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import {ProfilePage, LoginPage, SignUpPage, UsersAdminPage} from "./users";
import {SubmissionsPage} from "./submissions";
import {ProblemPage, ProblemsPage, ProblemsAdminPage} from "./problems";
import {UserRankingPage, TeamRankingPage, RegionRankingPage, LanguageRankingPage} from "./ranking";

import {Layout, HomePage, store} from "./common";

const history = syncHistoryWithStore(hashHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path="/" component={HomePage} />
                <Route path="/problems" component={ProblemsPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/problem/:id" component={ProblemPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/submissions" component={SubmissionsPage} />
                <Route path="/problemsAdmin" component={ProblemsAdminPage} />
                <Route path="/usersAdmin" component={UsersAdminPage} />
                <Route path="/userRanking" component={UserRankingPage} />
                <Route path="/langRanking/:lang" component={LanguageRankingPage} />
                <Route path="/teamRanking" component={TeamRankingPage} />
                <Route path="/regionRanking" component={RegionRankingPage} />
            </Route>
        </Router>
    </Provider>
);
