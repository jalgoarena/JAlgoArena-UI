import React from "react";
import Layout from './layout.jsx';
import { Router, Route, browserHistory } from 'react-router';
import AlgoArena from "./components/AlgoArena.jsx";

export default (
    <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path= "/" component={AlgoArena} />
        </Route>
    </Router>
);
