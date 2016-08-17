import React from 'react';
import {Row, PageHeader} from 'react-bootstrap';

import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

const SubmissionDetails = ({problem, sourceCode, onSubmit}) => (
    <Row>
        <PageHeader>{problem.title}</PageHeader>
        <ProblemDescription description={problem.description} />
        <ExampleInputAndOutput
            input={problem.example.input}
            output={problem.example.output} />
        <AceCodeEditor sourceCode={sourceCode || problem.skeleton_code} />
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
