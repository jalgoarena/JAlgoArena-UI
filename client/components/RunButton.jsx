import React from 'react';
import {Button} from 'react-bootstrap';

import FontAwesome from './FontAwesome';

const RunButton = ({sourceCode, problemId, onRun}) => (
    <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => onRun(sourceCode, problemId)}>
        <FontAwesome name="flash"/> Run
    </Button>
);

export default RunButton;
