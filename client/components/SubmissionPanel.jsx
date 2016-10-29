import React from 'react';

import RunButton from './RunButton';
import SubmitButton from './SubmitButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';

const SubmissionPanel = ({problem, sourceCode, result, userId, onRun, onSubmit, isSubmitDisabled}) => {

    let button = isSubmitDisabled
        ? <RunButton
            problemId={problem.id}
            sourceCode={sourceCode}
            onRun={onRun}
        />
        : <SubmitButton
            problem={problem}
            result={result}
            userId={userId}
            onSubmit={onSubmit}
        />;

    return <div>
        {button}
        <TimeLimit timeLimit={problem.time_limit}/>
        <br />
        <MemoryLimit memoryLimit={problem.memory_limit}/>
    </div>;
};

export default SubmissionPanel;
