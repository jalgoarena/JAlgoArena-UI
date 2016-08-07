import React from 'react';
import Spinner from 'spin.js';

export default class SubmissionInProgressSpinner extends React.Component {
    componentDidMount() {
        const opts = {
            lines: 13,
            length: 20,
            width: 10,
            radius: 30,
            trail: 60
        };

        let target = document.getElementById('searching_spinner_center');
        new Spinner(opts).spin(target);
    }

    render() {
        return <div id="SubmissionInProgressSpinner" className="modal fade" tabIndex="-1" role="dialog"
                    data-keyboard="false"
                    data-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Submission In Progress</h3>
                    </div>
                    <div className="modal-body">
                        <span id="searching_spinner_center"> </span>
                    </div>
                    <div className="modal-footer">
                        <div className="col-md-offset-4 col-md-8">
                            <img src="img/logo.png" className="img-responsive footer-logo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}