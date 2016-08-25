import React from "react";
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import {Layout} from './layout';
import RankPage from "./pages/leaderboard";
import Contests from "./pages/contests";
import ProfilePage from "./pages/profile";
import ProblemPage from "./pages/problem";
import ProblemsPage from "./pages/problems";
import Home from "./pages/home";
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup";

import { Provider } from 'react-redux'
import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path="/" component={Home} />
                <Route path="/problems" component={ProblemsPage} />
                <Route path="/contests" component={Contests} />
                <Route path="/leaderboard" component={RankPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/problem/:id" component={ProblemPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
            </Route>
        </Router>
    </Provider>
);
