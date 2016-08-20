import React from 'react';
import {Row, PageHeader} from 'react-bootstrap';

import ProblemDescription from './ProblemDescription.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

const SubmissionDetails = ({problem, sourceCode, onSubmit, onSourceCodeChanged}) => (
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
            sourceCode={sourceCode}
            onSubmit={onSubmit}
        />
    </Row>
);

export default SubmissionDetails;
