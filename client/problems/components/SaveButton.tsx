// @flow

import React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

type SaveButtonInputType = {
    sourceCode: string,
    savedSourceCode: string,
    problemId: string,
    onSave: (string, string) => void
}

const SaveButton = ({sourceCode, savedSourceCode, problemId, onSave}: SaveButtonInputType) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-primary pull-right"
        disabled={sourceCode === savedSourceCode}
        onClick={() => onSave(sourceCode, problemId)}>
        <FontAwesome prefix="fas" name="save"/> Save
    </button>
);

export default SaveButton;
