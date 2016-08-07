import React from 'react';

import Problems from './Problems.jsx';
import Output from './Output.jsx';
import SubmissionInProgressSpinner from './SubmissionInProgressSpinner.jsx';
import SubmissionDetails from './SubmissionDetails.jsx';

export default class AlgoArena extends React.Component {
    render() {
        const serverUrl = 'https://jalgoarena.herokuapp.com';

        return <div className="container">
            <Problems serverUrl={serverUrl} />
            <SubmissionDetails serverUrl={serverUrl} />
            <Output>
                <h2 className="text-info text-center">Submit your code to see results</h2>
            </Output>
            <SubmissionInProgressSpinner />
        </div>
    }
}