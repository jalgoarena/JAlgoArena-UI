// @flow

import React from 'react';

const ErrorLabel = ({validationError, authError}: {validationError: ?string, authError: {message: string}}) => {
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

    return <div></div>;
};

export default ErrorLabel;
