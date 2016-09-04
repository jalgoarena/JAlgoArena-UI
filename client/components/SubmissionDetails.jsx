import React from 'react';
import {Row, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import _ from 'lodash';

import ProblemDescription from './ProblemDescription';
import AceCodeEditor from './AceCodeEditor';
import SubmissionPanel from './SubmissionPanel';
import FontAwesome from './FontAwesome';

const SubmissionDetails = ({problem, result, sourceCode, onRun, onSubmit, onSourceCodeChanged, isSubmitDisabled, userId, submissions, onShowLinkedListNodeSourceCode, onRefresh}) => {

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

    let linkedListNodeButton = null;
    if (problem.skeleton_code.includes('LinkedListNode')) {
        linkedListNodeButton = <Button
            bsStyle="primary"
            onClick={onShowLinkedListNodeSourceCode}
        >LinkedListNode</Button>;
    }

    let details = <ButtonToolbar>
        <LinkContainer to={"problem/" + problem.id}>
            <Button bsStyle="danger" className="pull-right" onClick={onRefresh}>
                <FontAwesome name="refresh"/> Refresh
            </Button>
        </LinkContainer>
        <Button bsStyle="success" className="pull-right" >Max {problem.level * 10} Points</Button>
        {linkedListNodeButton}
    </ButtonToolbar>;

    return (
        <Row>
            {title}
            <ProblemDescription description={problem.description} />
            {details}
            <AceCodeEditor
                sourceCode={sourceCode}
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
