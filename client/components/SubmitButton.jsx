import React from 'react';

import FontAwesome from './FontAwesome';

const SubmitButton = ({result, userId, onSubmit, isSubmitDisabled, problem}) => (
    <button
        className="pulse-button btn btn-lg btn-success"
        disabled={isSubmitDisabled}
        onClick={() => onSubmit(result, userId, problem)}>
        <FontAwesome name="send"/> Submit
    </button>
);

export default SubmitButton;
