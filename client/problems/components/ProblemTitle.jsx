import React from 'react';
import * as _ from 'lodash';
import {PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';

const ProblemTitle = ({submissions, problem}) => {
    let submittedProblems = _.map(submissions, (submission) => submission.problemId);

    let isProblemDone = _.includes(submittedProblems, problem.id);
    let doneCheck = isProblemDone ? <FontAwesome name="check-circle" /> : null;

    return <PageHeader className={isProblemDone ? "text-success" : ""}>
        {problem.title} {doneCheck}
        <LinkContainer to={"problem/" + problem.id + "/rank"} className="pull-right">
            <Button
                bsStyle="info"
            ><FontAwesome name="trophy" lg={true}/> Problem Ranking</Button>
        </LinkContainer>
    </PageHeader>;
};

export default ProblemTitle;