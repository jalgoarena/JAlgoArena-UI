import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';

import RunButton from './RunButton';
import SubmitButton from './SubmitButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';

const SubmissionPanel = ({problemId, sourceCode, result, userId, onRun, onSubmit, timeLimit, memoryLimit, isSubmitDisabled}) => (
    <div>
        <ButtonToolbar className="pull-right">
                <RunButton
                    problemId={problemId}
                    sourceCode={sourceCode}
                    onRun={onRun}
                />
                <SubmitButton
                    result={result}
                    userId={userId}
                    onSubmit={onSubmit}
                    isSubmitDisabled={isSubmitDisabled}
                />
        </ButtonToolbar>

        <TimeLimit timeLimit={timeLimit}/>
        <br />
        <MemoryLimit memoryLimit={memoryLimit}/>
    </div>
);

export default SubmissionPanel;
