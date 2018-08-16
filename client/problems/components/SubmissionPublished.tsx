// @flow

import React from 'react';

import DisplaySubmissionId from './DisplaySubmissionId';

const SubmissionPublished = ({submissionId, userId}: {submissionId: string, userId: string}) => {

    if (submissionId) {
        return <div>
            <h2 className="text-success text-center">Published, check submissions</h2>
            <DisplaySubmissionId submissionId={submissionId}/>
        </div>;
    } else if (userId) {
        return <div>
            <h2 className="text-info text-center">Remember, every re-submissions means 1 penalty point</h2>
        </div>;
    }
    else {
        return <h2 className="text-info text-center">You have to be logged in, readonly mode</h2>;
    }
};

export default SubmissionPublished;