import React from 'react';
import {Button} from 'react-bootstrap';

import {SubmissionActions} from "../actions/submission.js";
import {LoadingInProgressActions} from "../actions/loadingInProgress.js";
import store from '../stores';
import {sendSubmission, showModal} from '../actions';

export default class SubmitButton extends React.Component {
    submitCode() {
        LoadingInProgressActions.LoadingInProgress("Submitting in progress");
        SubmissionActions.SendSubmission(this.props.problemId);
        const sourceCode = store.getState().sourceCode;
        store.dispatch(showModal("Submission in progress"));
        store.dispatch(sendSubmission(sourceCode, this.props.problemId));
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
