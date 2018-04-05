// @flow

import React from 'react';
import {Row} from 'react-bootstrap';

import SubmissionPublished from './SubmissionPublished';

const outputStyle = {
    marginTop: 30,
    borderRadius: 10,
    border: "1px solid black",
    padding: "0 10px 10px",
};

const Output = ({submissionId}: {submissionId: string}) => (
    <Row style={outputStyle}>
        <SubmissionPublished submissionId={submissionId}/>
    </Row>
);

export default Output;
