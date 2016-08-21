import React from 'react';
import {Button} from 'react-bootstrap';

import FontAwesome from './FontAwesome';

const SubmitButton = ({sourceCode, problemId, onSubmit, isSubmitDisabled}) => (
    <Button
        bsStyle="success"
        bsSize="large"
        disabled={isSubmitDisabled}
        onClick={() => onSubmit(sourceCode, problemId)}>
        <FontAwesome name="send"/> Submit
    </Button>
);

export default SubmitButton;
