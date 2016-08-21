import React from 'react';
import {Row, PageHeader} from 'react-bootstrap';

import ProblemDescription from './ProblemDescription.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

const SubmissionDetails = ({problem, result, sourceCode, onRun, onSubmit, onSourceCodeChanged, isSubmitDisabled, userId}) => (
    <Row>
        <PageHeader>{problem.title}</PageHeader>
        <ProblemDescription description={problem.description} />
        <AceCodeEditor
            sourceCode={sourceCode || problem.skeleton_code}
            onSourceCodeChanged={onSourceCodeChanged}
        />
        <SubmissionPanel
            timeLimit={problem.time_limit}
            memoryLimit={problem.memory_limit}
            problemId={problem.id}
            userId={userId}
            result={result}
            sourceCode={sourceCode}
            onRun={onRun}
            onSubmit={onSubmit}
            isSubmitDisabled={isSubmitDisabled}
        />
    </Row>
);

export default SubmissionDetails;
