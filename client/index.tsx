import "babel-polyfill";
require('es6-promise').polyfill();

import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom'
import Router from './router.jsx';

import './assets/app.css';

ReactDOM.render(
    Router,
    document.getElementById('app')
);
