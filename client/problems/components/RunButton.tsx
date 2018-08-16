// @flow

import React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

type RunButtonInputType = {
    sourceCode: string,
    problemId: string,
    userId: string,
    onRun: (string, string, string) => void
}

const RunButton = ({sourceCode, problemId, userId, onRun}: RunButtonInputType) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-success pull-right"
        onClick={() => onRun(sourceCode, problemId, userId)}>
        <FontAwesome prefix="fas" name="bolt"/> Submit
    </button>
);

export default RunButton;
