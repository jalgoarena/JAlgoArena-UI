import React from "react";
import Layout from './layout.jsx';
import { Router, Route, hashHistory } from 'react-router';

import AlgoArena from "./components/AlgoArena.jsx";
import Leaderboard from "./pages/leaderboard.jsx";
import Profile from "./pages/profile.jsx";
import Problem from "./pages/problem.jsx";

export default (
    <Router history={hashHistory}>
        <Route component={Layout}>
            <Route path="/" component={AlgoArena} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/problem/:id" component={Problem} />
        </Route>
    </Router>
);
