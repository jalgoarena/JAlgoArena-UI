import React from 'react'
import dom from 'react-dom'
import Router from './common/router.jsx';
import 'babel-polyfill';

dom.render(
    Router,
    document.getElementById('app')
);
