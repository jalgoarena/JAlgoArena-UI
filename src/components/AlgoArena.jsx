import React from 'react';

import Problems from './Problems.jsx';
import Output from './Output.jsx';
import SubmissionInProgressSpinner from './SubmissionInProgressSpinner.jsx';
import SubmissionDetails from './SubmissionDetails.jsx';

export default class AlgoArena extends React.Component {
    render() {
        return <div className="container">
            <Problems />
            <SubmissionDetails />
            <Output />
            <SubmissionInProgressSpinner />
        </div>
    }
}