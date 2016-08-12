import React from 'react';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';

const Problem = React.createClass({
    render: function() {
        let problem = this.props.problems.find((problem) => problem.id === this.props.params.id);

        return <div className="container">
            <SubmissionDetails problem={problem}/>
            <Output />
            <SubmissionInProgress />
        </div>;
    }
});

module.exports = Problem;