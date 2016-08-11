import React from 'react';

export default class TimeAndMemoryReport extends React.Component {
    render() {
        const timeAndMemoryReportStyle = {
            marginTop: 3
        };

        return <div className="col-md-12 text-center" style={timeAndMemoryReportStyle}>
            <span>
                <i className="fa fa-clock-o" aria-hidden="true"> </i> {Math.round(this.props.elapsedTime) + " ms"}
                &nbsp;|&nbsp;
                <i className="fa fa-database" aria-hidden="true"> </i> {this.props.consumedMemory + " kb"}
            </span>
        </div>
    }
}