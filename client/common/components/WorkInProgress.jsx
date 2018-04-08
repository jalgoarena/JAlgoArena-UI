// @flow

import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {closeWorkInProgressWindow} from "../actions/index";
import ReactSpinner from "./ReactSpinner";

const spinnerOpts = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    trail: 60
};

const logoStyle = {
    height: 50,
    marginBottom: 15
};

const searchingSpinnerCenterStyle = {
    position: "absolute",
    display: "block",
    top: "50%",
    left: "50%"
};

const modalTextCenterStyle = {
    textAlign: "center"
};

const modalBodyStyle = {
    height: 200
};

const WorkInProgress = ({showModal, onHide}: {showModal: boolean, onHide: () => void}) => (
    <Modal show={showModal || false} onHide={onHide}>
        <Modal.Header style={modalTextCenterStyle} closeButton>
            <h3>{"Loading ..."}</h3>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <ReactSpinner config={spinnerOpts} style={searchingSpinnerCenterStyle} />
        </Modal.Body>
        <Modal.Footer style={modalTextCenterStyle}>
            <div className="col-md-offset-4 col-md-8">
                <img src="../img/logo.png" className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);

const mapStateToProps = (state: {showModal: boolean}) => {
    return {
        showModal: state.showModal
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
        }
    }
};

const WorkInProgressModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkInProgress);

export default WorkInProgressModal;
