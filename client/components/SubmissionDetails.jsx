import React from 'react';
import {Row, PageHeader} from 'react-bootstrap';
import _ from 'lodash';

import ProblemDescription from './ProblemDescription';
import AceCodeEditor from './AceCodeEditor';
import SubmissionPanel from './SubmissionPanel';
import FontAwesome from './FontAwesome';

const SubmissionDetails = ({problem, result, sourceCode, onRun, onSubmit, onSourceCodeChanged, isSubmitDisabled, userId, submissions}) => {

    let title = <PageHeader>{problem.title}</PageHeader>;

    let submittedProblems = _.map(submissions, (submission) => submission.result.problemId);

    if (_.includes(submittedProblems, problem.id)) {
        title = <PageHeader className="text-success">{problem.title} <FontAwesome name="check-circle" /></PageHeader>;
    }

    return (
        <Row>
            {title}
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
    )
};

export default SubmissionDetails;
