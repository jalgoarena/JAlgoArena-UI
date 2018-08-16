// @flow

import React from "react";
import {HashRouter} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router'
import { Provider } from 'react-redux'

import {Layout, store, history} from "./common";

export default (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HashRouter>
                <Layout store={store} />
            </HashRouter>
        </ConnectedRouter>
    </Provider>
);
