import React from 'react';
import {Grid} from 'react-bootstrap';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';
import {SubmissionActions} from "../actions/submission.js";

export default class Problem extends React.Component{
    componentDidMount() {
        SubmissionActions.ResetSourceCode();
    }
    render() {
        if (!this.props.problems) {
            return null;
        }

        let problem = this.props.problems.find((problem) => problem.id === this.props.params.id);

        if (!problem) {
            return null;
        }

        return <Grid>
            <SubmissionDetails problem={problem} sourceCode={this.props.sourceCode} />
            <Output result={this.props.result}/>
            <SubmissionInProgress title={this.props.modalTitle} showModal={this.props.showModal} />
        </Grid>;
    }
}