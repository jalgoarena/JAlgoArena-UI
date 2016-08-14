import React from 'react';
import Spinner from 'react-spin';
import {Modal} from 'react-bootstrap';

export default class SubmissionInProgress extends React.Component {
    render() {
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

        return <Modal show={this.props.showModal || false}>
            <Modal.Header style={modalTextCenterStyle}>
                <h3>{this.props.title || "Title"}</h3>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>
                <Spinner config={spinnerOpts} stopped={false} style={searchingSpinnerCenterStyle} />
            </Modal.Body>
            <Modal.Footer style={modalTextCenterStyle}>
                <div className="col-md-offset-4 col-md-8">
                    <img src="../img/logo.png" className="img-responsive" style={logoStyle} />
                </div>
            </Modal.Footer>
        </Modal>;
    }
}