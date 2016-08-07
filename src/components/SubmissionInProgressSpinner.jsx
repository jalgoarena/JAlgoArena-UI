import React from 'react';
import Spinner from 'spin.js';

export default class SubmissionInProgressSpinner extends React.Component {
    componentDidMount() {
        const opts = {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left:'auto' // Left position relative to parent in px
        };

        let target = document.getElementById('searching_spinner_center');
        let spinner = new Spinner(opts).spin(target);
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