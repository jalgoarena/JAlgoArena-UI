import React from 'react';
import {Button} from 'react-bootstrap';

import store from '../stores';
import {sendSubmission, showModal} from '../actions';
import FontAwesome from './FontAwesome';

export default class SubmitButton extends React.Component {
    submitCode() {
        const sourceCode = store.getState().sourceCode;
        store.dispatch(showModal("Submission in progress"));
        store.dispatch(sendSubmission(sourceCode, this.props.problemId));
    }
    render() {
        return <Button
            bsStyle="success"
            bsSize="large"
            className="pull-right"
            onClick={() => this.submitCode()}
            style={{width: 200}}
        >
            <FontAwesome name="send"/> Submit
        </Button>;
    }
}
