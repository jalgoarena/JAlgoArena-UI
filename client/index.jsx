import React from 'react';
import ReactDOM from 'react-dom'
import Router from './router.jsx';
import 'isomorphic-fetch';

import './assets/app.css';

ReactDOM.render(
    Router,
    document.getElementById('app')
);
