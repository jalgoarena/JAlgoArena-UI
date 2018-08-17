import * as React from 'react';
import {Row} from 'react-bootstrap';

import SubmissionPublished from './SubmissionPublished';
import {CSSProperties} from "react";

const outputStyle: CSSProperties = {
    marginTop: 30,
    borderRadius: 10,
    border: "1px solid black",
    padding: "0 10px 10px",
};

interface OutputProps {
    submissionId: string,
    userId: string | null
}

const Output = (props: OutputProps) => (
    <Row style={outputStyle}>
        <SubmissionPublished submissionId={props.submissionId} userId={props.userId}/>
    </Row>
);

export default Output;
