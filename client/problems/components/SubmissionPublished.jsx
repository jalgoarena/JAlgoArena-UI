// @flow

import React from 'react';

import DisplaySubmissionId from './DisplaySubmissionId';

const SubmissionPublished = ({submissionId}: {submissionId: string}) => {

    if (submissionId) {
        return <div>
            <h2 className="text-success text-center">Published, check submissions</h2>
            <DisplaySubmissionId submissionId={submissionId}/>
        </div>;
    } else {
        return <h2 className="text-info text-center">Run your code to see results</h2>;
    }
};

export default SubmissionPublished;