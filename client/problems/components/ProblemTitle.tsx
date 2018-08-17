import * as React from 'react';
import * as _ from 'lodash';
import {PageHeader, Button} from 'react-bootstrap';

import FontAwesome from '../../common/components/FontAwesome';
import {Submission} from "../domain/Submission";
import Problem from "../domain/Problem";

interface ProblemTitleProps {
    submissions: Array<Submission>,
    problem: Problem,
    onShowProblemRanking: () => void
}

const ProblemTitle = (props: ProblemTitleProps) => {
    let acceptedSubmissions = _.filter(props.submissions,
        (submission: Submission) => submission.statusCode === 'ACCEPTED'
    );
    let failedSubmissions = _.filter(props.submissions,
        (submission: Submission) => submission.statusCode !== 'ACCEPTED'
    );

    let submittedAcceptedProblems = _.map(acceptedSubmissions, (submission) => submission.problemId);
    let submittedFailedProblems = _.map(failedSubmissions, (submission) => submission.problemId);

    const isSuccess = _.includes(submittedAcceptedProblems, props.problem.id);
    const isFailure = _.includes(submittedFailedProblems, props.problem.id);

    let doneCheck = isSuccess
        ? <FontAwesome prefix="fas" name="check-circle"/>
        : isFailure
            ? <FontAwesome prefix="fas" name="times-circle"/>
            : null;

    const successOrDangerStyle = isSuccess
        ? "text-success"
        : isFailure
            ? "text-danger"
            : "";

    return <PageHeader className={successOrDangerStyle}>
        {props.problem.title} {doneCheck}
        <Button bsStyle="info"
                className="pull-right"
                onClick={props.onShowProblemRanking}>
            <FontAwesome prefix="fas" name="trophy" lg={true}/> Problem Ranking
        </Button>
    </PageHeader>;
};

export default ProblemTitle;