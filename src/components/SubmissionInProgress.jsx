import React from 'react';
import Spinner from 'react-spin';

export default class SubmissionInProgress extends React.Component {
    render() {
        const opts = {
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

        return <div id="SubmissionInProgressSpinner" className="modal fade" tabIndex="-1" role="dialog"
                    data-keyboard="false"
                    data-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={modalTextCenterStyle}>
                        <h3>Submission In Progress</h3>
                    </div>
                    <div className="modal-body" style={modalBodyStyle}>
                        <Spinner config={opts} stopped={false} style={searchingSpinnerCenterStyle} />
                    </div>
                    <div className="modal-footer" style={modalTextCenterStyle}>
                        <div className="col-md-offset-4 col-md-8">
                            <img src="../img/logo.png" className="img-responsive" style={logoStyle} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}