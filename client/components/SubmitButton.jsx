import React from 'react';
import {Button} from 'react-bootstrap';

import FontAwesome from './FontAwesome';

const SubmitButton = ({result, userId, onSubmit, isSubmitDisabled, problem}) => (
    <Button
        bsStyle="success"
        bsSize="large"
        disabled={isSubmitDisabled}
        onClick={() => onSubmit(result, userId, problem)}>
        <FontAwesome name="send"/> Submit
    </Button>
);

export default SubmitButton;
