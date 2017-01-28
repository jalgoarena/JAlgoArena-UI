import React from "react";
import {Alert, Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import {clearErrorMessage} from "../actions/index";

const style = {
    margin: 10
};

class ErrorMessage extends React.Component {

    render() {
        let error = this.props.errorMessage;

        return error === null
            ? null
            : ( <Col mdOffset={1} md={10}>
                    <Alert bsStyle="danger" onDismiss={() => this.props.onDismiss()} style={style}>
                        <h4>Error</h4>
                        <p>{error}</p>
                    </Alert>
                </Col>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDismiss: () => {
            dispatch(clearErrorMessage());
        }
    }
};

const ErrorMessageBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorMessage);

export default ErrorMessageBox;
