import React from 'react';
import SubmitButton from './SubmitButton.jsx';
import MemoryLimit from './MemoryLimit.jsx';
import TimeLimit from './TimeLimit.jsx';

const SubmissionPanel = ({problemId, sourceCode, onSubmit, timeLimit, memoryLimit}) => (
    <div>
        <SubmitButton
            problemId={problemId}
            sourceCode={sourceCode}
            onSubmit={onSubmit}
        />
        <TimeLimit timeLimit={timeLimit} />
        <br />
        <MemoryLimit memoryLimit={memoryLimit} />
    </div>
);

export default SubmissionPanel;
