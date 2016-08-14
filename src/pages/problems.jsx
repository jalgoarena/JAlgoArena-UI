import React from 'react';
import {Grid} from 'react-bootstrap';

import Problem from '../components/Problem.jsx';
import SubmissionInProgress from "../components/SubmissionInProgress.jsx";
import {LoadingInProgressActions} from "../actions/loadingInProgress.js";

export default class Problems extends React.Component {
    componentWillMount() {
        if (!this.props.problems) {
            LoadingInProgressActions.LoadingInProgress('Downloading Problems');
        }
    }
    render() {
        let problems = this.props.problems || [];

        let problemNodes = problems.map((problem, idx) => {
            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
            />;
        });

        return <Grid>
            <SubmissionInProgress title={this.props.modalTitle} showModal={this.props.showModal} />
            {problemNodes}
        </Grid>;
    }
}
