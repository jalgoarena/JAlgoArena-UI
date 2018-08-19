import * as React from 'react';
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
    let acceptedSubmissions = props.submissions.filter(
        (submission: Submission) => submission.statusCode === 'ACCEPTED'
    );
    let failedSubmissions = props.submissions.filter(
        (submission: Submission) => submission.statusCode !== 'ACCEPTED'
    );

    let submittedAcceptedProblems = acceptedSubmissions.map((submission) => submission.problemId);
    let submittedFailedProblems = failedSubmissions.map((submission) => submission.problemId);

    const isSuccess = submittedAcceptedProblems.indexOf(props.problem.id) !== -1;
    const isFailure = submittedFailedProblems.indexOf(props.problem.id) !== -1;

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