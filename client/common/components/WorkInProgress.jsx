// @flow

import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {closeWorkInProgressWindow} from "../actions/index";
import ReactSpinner from "./ReactSpinner";
import logo from '../../assets/img/logo.png';

const logoStyle = {
    height: 50,
    marginBottom: 15
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
            <ReactSpinner />
        </Modal.Body>
        <Modal.Footer style={modalTextCenterStyle}>
            <div className="col-md-offset-4 col-md-8">
                <img src={logo} className="img-responsive" style={logoStyle} />
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
