import React from 'react';
import _ from 'lodash';
import {PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from './FontAwesome';

const ProblemTitle = ({submissions, problem}) => {
    let submittedProblems = _.map(submissions, (submission) => submission.problemId);

    if (_.includes(submittedProblems, problem.id)) {
        return <PageHeader className="text-success">
            {problem.title} <FontAwesome name="check-circle" />
            <LinkContainer to={"problem/" + problem.id + "/rank"} className="pull-right">
                <Button
                    bsStyle="info"
                ><FontAwesome name="trophy" lg={true}/> Problem Ranking</Button>
            </LinkContainer>
        </PageHeader>;
    } else {
        return <PageHeader>{problem.title}</PageHeader>;
    }
};

export default ProblemTitle;