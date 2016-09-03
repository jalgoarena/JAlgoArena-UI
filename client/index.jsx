import React from 'react'
import {render} from 'react-dom'
import Router from './router.jsx';
import 'babel-polyfill';

render(
    Router,
    document.getElementById('app')
);
