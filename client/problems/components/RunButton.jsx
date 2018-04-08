// @flow

import React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

type RunButtonInputType = {
    sourceCode: string,
    problemId: string,
    userId: string,
    language: string,
    onRun: (string, string, string, string) => void
}

const RunButton = ({sourceCode, problemId, userId, language, onRun}: RunButtonInputType) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-primary pull-right"
        onClick={() => onRun(sourceCode, problemId, userId, language)}>
        <FontAwesome prefix="fas" name="bolt"/> Run
    </button>
);

export default RunButton;
