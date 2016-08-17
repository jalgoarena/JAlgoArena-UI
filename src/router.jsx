import React from "react";
import {Layout} from './layout.jsx';
import { Router, Route, hashHistory } from 'react-router';

import Leaderboard from "./pages/leaderboard.jsx";
import Profile from "./pages/profile.jsx";
import ProblemPage from "./pages/problem.jsx";
import ProblemsPage from "./pages/problems.jsx";
import Home from "./pages/home.jsx";

import { Provider } from 'react-redux'
import store from './stores';

export default (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={Layout}>
                <Route path="/" component={Home} />
                <Route path="/problems" component={ProblemsPage} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/profile" component={Profile} />
                <Route path="/problem/:id" component={ProblemPage} />
            </Route>
        </Router>
    </Provider>
);
