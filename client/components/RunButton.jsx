import React from 'react';

import FontAwesome from './FontAwesome';

const RunButton = ({sourceCode, problemId, onRun}) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-primary pull-right"
        onClick={() => onRun(sourceCode, problemId)}>
        <FontAwesome name="flash"/> Run
    </button>
);

export default RunButton;
