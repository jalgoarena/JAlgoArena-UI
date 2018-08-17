import * as React from 'react';

import FontAwesome from '../../common/components/FontAwesome';

type RunButtonProps = {
    sourceCode: string,
    problemId: string,
    userId: string,
    onRun: (sourceCode: string, problemId: string, userId: string) => void
}

const RunButton = (props: RunButtonProps) => (
    <button
        style={{width: '200px'}}
        className="btn btn-lg btn-success pull-right"
        onClick={() => props.onRun(props.sourceCode, props.problemId, props.userId)}>
        <FontAwesome prefix="fas" name="bolt"/> Submit
    </button>
);

export default RunButton;
