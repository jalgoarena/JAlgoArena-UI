import React from 'react';
import FontAwesome from './FontAwesome';

export default class TimeAndMemoryReport extends React.Component {
    render() {
        const timeAndMemoryReportStyle = {
            marginTop: 3
        };

        return <div className="col-md-12 text-center" style={timeAndMemoryReportStyle}>
            <span>
                <FontAwesome name="clock-o"/> {Math.round(this.props.elapsedTime) + " ms"}
                {" | "}
                <FontAwesome name="database"/> {this.props.consumedMemory + " kb"}
            </span>
        </div>
    }
}