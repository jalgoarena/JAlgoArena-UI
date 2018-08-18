import * as React from 'react';
import {Alert, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {clearErrorMessage} from '../actions/index';
import {Dispatch} from 'redux';
import {CSSProperties} from "react";

const style: CSSProperties = {
    margin: 10,
};

interface ErrorMessageProps {
    error: string;
    onDismiss: (() => void)
}

const ErrorMessage = (props: ErrorMessageProps) =>
    props.error === null ? null : (
        <Col mdOffset={1} md={10}>
            <Alert bsStyle="danger" onDismiss={() => props.onDismiss()} style={style}>
                <h4>Error</h4>
                <p>{props.error}</p>
            </Alert>
        </Col>
    );

const mapStateToProps = (state: { errorMessage: string }) => {
    return {
        error: state.errorMessage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onDismiss: () => {
            dispatch(clearErrorMessage());
        },
    };
};

const ErrorMessageBox = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ErrorMessage);

export default ErrorMessageBox;
