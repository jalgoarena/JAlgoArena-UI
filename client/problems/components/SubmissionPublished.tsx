import * as React from 'react';

import DisplaySubmissionId from './DisplaySubmissionId';

interface SubmissionPublishedProps {
    submissionId: string | null
    userId: string | null
}

const SubmissionPublished = (props: SubmissionPublishedProps) => {

    return props.submissionId ? <div>
        <h2 className="text-success text-center">Published, check submissions</h2>
        <DisplaySubmissionId submissionId={props.submissionId}/>
    </div> : props.userId ? <div>
        <h2 className="text-info text-center">Remember, every re-submissions means 1 penalty point</h2>
    </div> : <h2 className="text-info text-center">You have to be logged in, readonly mode</h2>;
};

export default SubmissionPublished;