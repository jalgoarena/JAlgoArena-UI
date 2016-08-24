import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';

import Problem from '../components/Problem';
import WorkInProgress from "../components/WorkInProgress";

class Problems extends React.Component {
    render() {
        let problems = this.props.problems || [];

        let problemNodes = problems.map((problem, idx) => {

            let submittedProblems = _.map(this.props.submissions, (submission) => submission.result.problemId);

            const isDone = _.includes(submittedProblems, problem.id);

            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
                submissions={this.props.submissions}
                isDone={isDone}
            />;
        });

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} />
            {problemNodes}
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems,
        showModal: state.showModal,
        submissions: state.submissions
    }
};


const ProblemsPage = connect(
    mapStateToProps
)(Problems);

export default ProblemsPage;