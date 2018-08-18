require('es6-promise').polyfill();

import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom'
import Router from './router';

import './assets/app.css';

ReactDOM.render(
    Router,
    document.getElementById('app')
);
