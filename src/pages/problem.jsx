import React from 'react';
import {Grid} from 'react-bootstrap';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';

const Problem = React.createClass({
    render: function() {
        if (!this.props.problems) {
            return null;
        }

        let problem = this.props.problems.find((problem) => problem.id === this.props.params.id);

        return <Grid>
            <SubmissionDetails problem={problem}/>
            <Output result={this.props.result}/>
            <SubmissionInProgress />
        </Grid>;
    }
});

module.exports = Problem;