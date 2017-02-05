// @flow

import React from 'react';
import {Row} from 'react-bootstrap';

import SubmissionResult from './SubmissionResult';
import JudgeResponse from "../domain/JudgeResponse";

const outputStyle = {
    marginTop: 30,
    borderRadius: 10,
    border: "1px solid black",
    padding: "0 10px 10px",
};

const Output = ({result}: {result: JudgeResponse}) => (
    <Row style={outputStyle}>
        <SubmissionResult result={result}/>
    </Row>
);

export default Output;
