import * as React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

type SaveButtonProps = {
    sourceCode: string,
    savedSourceCode: string,
    problemId: string,
    onSave: (sourceCode: string, problemId: string) => void
}

const SaveButton = (props: SaveButtonProps) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-primary pull-right"
        disabled={props.sourceCode === props.savedSourceCode}
        onClick={() => props.onSave(props.sourceCode, props.problemId)}>
        <FontAwesome prefix="fas" name="save"/> Save
    </button>
);

export default SaveButton;
