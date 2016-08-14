import React from 'react';

import {SubmissionActions} from "../actions/submission.js";

export default class SubmitButton extends React.Component {
    submitCode() {
        SubmissionActions.SendSubmission(this.props.problemId);
    }
    render() {
        const submitButtonStyle = {
            width: 200
        };

        return <button
            type="button"
            className="btn btn-success btn-lg pull-right"
            onClick={this.submitCode}
            style={submitButtonStyle}>
            <i className="fa fa-send"> </i> Submit
        </button>;
    }
}
