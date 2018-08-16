// @flow

import React from 'react';
import FontAwesome from '../../common/components/FontAwesome';

const style = {
    marginTop: 3
};

const DisplaySubmissionId = ({submissionId}: {submissionId: string}) => (
    <div className="col-md-12 text-center" style={style}>
            <span>
                Submission id: {submissionId}
            </span>
    </div>
);

export default DisplaySubmissionId;
