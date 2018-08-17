import * as React from 'react';
import {CSSProperties} from "react";

const style: CSSProperties = {
    marginTop: 3
};

interface DisplaySubmissionIdProps {submissionId: string}

const DisplaySubmissionId = (props: DisplaySubmissionIdProps) => (
    <div className="col-md-12 text-center" style={style}>
            <span>
                Submission id: {props.submissionId}
            </span>
    </div>
);

export default DisplaySubmissionId;
