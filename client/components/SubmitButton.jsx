import React from 'react';
import {Button} from 'react-bootstrap';

import FontAwesome from './FontAwesome';

const SubmitButton = ({result, userId, onSubmit, isSubmitDisabled}) => (
    <Button
        bsStyle="success"
        bsSize="large"
        disabled={isSubmitDisabled}
        onClick={() => onSubmit(result, userId)}>
        <FontAwesome name="send"/> Submit
    </Button>
);

export default SubmitButton;
