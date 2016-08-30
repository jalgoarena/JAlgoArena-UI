import React from 'react';
import {Row, PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import _ from 'lodash';

import ProblemDescription from './ProblemDescription';
import AceCodeEditor from './AceCodeEditor';
import SubmissionPanel from './SubmissionPanel';
import FontAwesome from './FontAwesome';

const SubmissionDetails = ({problem, result, sourceCode, onRun, onSubmit, onSourceCodeChanged, isSubmitDisabled, userId, submissions}) => {

    let title = <PageHeader>{problem.title}</PageHeader>;

    let submittedProblems = _.map(submissions, (submission) => submission.problemId);

    if (_.includes(submittedProblems, problem.id)) {
        title = <PageHeader className="text-success">
            {problem.title} <FontAwesome name="check-circle" />
            <LinkContainer to={"problem/" + problem.id + "/rank"} className="pull-right">
                <Button
                    bsStyle="info"
                ><FontAwesome name="trophy" lg={true}/> Problem Ranking</Button>
            </LinkContainer>
        </PageHeader>;
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
                problem={problem}
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
