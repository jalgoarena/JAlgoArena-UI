import React from 'react';

const ErrorLabel = ({validationError, authError}) => {
    if (validationError) {
        return (
            <div className="form-group has-error">
                <label className="control-label">{validationError}</label>
            </div>
        );
    }

    if (authError) {
        return (
            <div className="form-group has-error">
                <label className="control-label">{authError.message}</label>
            </div>
        );
    }

    return null;
};

export default ErrorLabel;
