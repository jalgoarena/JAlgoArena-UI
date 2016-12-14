import React from 'react';

import RunButton from './RunButton';
import SubmitButton from './SubmitButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';

const SubmissionPanel = ({problem, sourceCode, result, userId, onRun, onSubmit, isSubmitDisabled, activeLanguage}) => {

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
            activeLanguage={activeLanguage}
        />;

    return <div>
        {button}
        <TimeLimit timeLimit={problem.timeLimit}/>
        <br />
        <MemoryLimit memoryLimit={problem.memoryLimit}/>
    </div>;
};

export default SubmissionPanel;
