import React from 'react';
import {Button} from 'react-bootstrap';

import FontAwesome from './FontAwesome';

const SubmitButton = ({sourceCode, problemId, onSubmit}) => (
    <Button
        bsStyle="success"
        bsSize="large"
        className="pull-right"
        onClick={() => onSubmit(sourceCode, problemId)}
        style={{width: 200}}>
        <FontAwesome name="send"/> Submit
    </Button>
);

export default SubmitButton;
