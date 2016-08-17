import React from 'react';
import {Grid} from 'react-bootstrap';

import Output from '../components/Output.jsx';
import WorkInProgress from '../components/WorkInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';
import {SubmissionActions} from "../actions/submission.js";
import store from '../stores';
import {resetSourceCode} from '../actions';

export default class Problem extends React.Component{
    componentDidMount() {
        SubmissionActions.ResetSourceCode();
        store.dispatch(resetSourceCode());
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
            <WorkInProgress title={this.props.modalTitle} showModal={this.props.showModal} />
        </Grid>;
    }
}