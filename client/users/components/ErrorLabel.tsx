// @flow

import React from 'react';

const ErrorLabel = ({validationError, authError}: {validationError: ?string, authError: string}) => {
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
                <label className="control-label">{authError}</label>
            </div>
        );
    }

    return <div />;
};

export default ErrorLabel;
