// @flow

import React from 'react';
import * as _ from 'lodash';
import {PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';
import {Submission} from "../../submissions/domain/Submission";
import Problem from "../domain/Problem";

const ProblemTitle = ({submissions, problem}: {submissions: Array<Submission>, problem: Problem}) => {
    let acceptedSubmissions = _.filter(submissions,
        (submission: Submission) => submission.statusCode === 'ACCEPTED'
    );
    let failedSubmissions = _.filter(submissions,
        (submission: Submission) => submission.statusCode !== 'ACCEPTED'
    );

    let submittedAcceptedProblems = _.map(acceptedSubmissions, (submission) => submission.problemId);
    let submittedFailedProblems = _.map(failedSubmissions, (submission) => submission.problemId);

    const isSuccess = _.includes(submittedAcceptedProblems, problem.id);
    const isFailure = _.includes(submittedFailedProblems, problem.id);

    let doneCheck = isSuccess
        ? <FontAwesome name="check-circle" />
        : isFailure
            ? <FontAwesome name="times-circle" />
            : null;

    const successOrDangerStyle = isSuccess
        ? "text-success"
        : isFailure
            ? "text-danger"
            : "";

    return <PageHeader className={successOrDangerStyle}>
        {problem.title} {doneCheck}
        <LinkContainer to={"problem/" + problem.id + "/rank"} className="pull-right">
            <Button
                bsStyle="info"
            ><FontAwesome name="trophy" lg={true}/> Problem Ranking</Button>
        </LinkContainer>
    </PageHeader>;
};

export default ProblemTitle;