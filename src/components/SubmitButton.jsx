import React from 'react';
import {Button} from 'react-bootstrap';

import {SubmissionActions} from "../actions/submission.js";

export default class SubmitButton extends React.Component {
    submitCode() {
        SubmissionActions.SendSubmission(this.props.problemId);
    }
    render() {
        const submitButtonStyle = {
            width: 200
        };

        return <Button
            bsStyle="success"
            bsSize="large"
            className="pull-right"
            onClick={() => this.submitCode()}
            style={submitButtonStyle}>
            <i className="fa fa-send"> </i> Submit
        </Button>;
    }
}
