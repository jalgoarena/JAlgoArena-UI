import React from 'react'
import {render} from 'react-dom'
import Router from './router.jsx';
import 'babel-polyfill';

$('body').bind('copy paste',function(e) {
    e.preventDefault(); return false;
});

render(
    Router,
    document.getElementById('app')
);
