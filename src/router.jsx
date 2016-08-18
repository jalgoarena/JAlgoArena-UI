import React from "react";
import { Router, Route, hashHistory } from 'react-router';

import {Layout} from './layout';
import Leaderboard from "./pages/leaderboard";
import ProfilePage from "./pages/profile";
import ProblemPage from "./pages/problem";
import ProblemsPage from "./pages/problems";
import Home from "./pages/home";
import LoginPage from "./pages/login"
import Register from "./pages/register";

import { Provider } from 'react-redux'
import store from './stores';

export default (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={Layout}>
                <Route path="/" component={Home} />
                <Route path="/problems" component={ProblemsPage} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/problem/:id" component={ProblemPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={Register} />
            </Route>
        </Router>
    </Provider>
);
