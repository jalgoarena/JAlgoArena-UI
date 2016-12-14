import React from 'react';

import FontAwesome from './FontAwesome';

const SubmitButton = ({result, userId, onSubmit, problem, activeLanguage}) => (
    <button
        style={{width: '200px'}}
        className="pulse-button btn btn-lg btn-success pull-right"
        onClick={() => onSubmit(result, userId, problem, activeLanguage)}>
        <FontAwesome name="send"/> Submit
    </button>
);

export default SubmitButton;
