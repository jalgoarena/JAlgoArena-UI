import * as React from 'react';

interface ErrorLabelProps {
    validationError: string | null,
    authError: string | null
}

const ErrorLabel = (props: ErrorLabelProps) => {
    if (props.validationError) {
        return (
            <div className="form-group has-error">
                <label className="control-label">{props.validationError}</label>
            </div>
        );
    }

    if (props.authError) {
        return (
            <div className="form-group has-error">
                <label className="control-label">{props.authError}</label>
            </div>
        );
    }

    return <div/>;
};

export default ErrorLabel;
