import React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

const RunButton = ({sourceCode, problemId, userId, language, onRun}) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-primary pull-right"
        onClick={() => onRun(sourceCode, problemId, userId, language)}>
        <FontAwesome name="flash"/> Run
    </button>
);

export default RunButton;
