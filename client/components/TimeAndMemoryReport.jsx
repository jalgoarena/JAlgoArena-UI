import React from 'react';
import FontAwesome from './FontAwesome';

const timeAndMemoryReportStyle = {
    marginTop: 3
};

const TimeAndMemoryReport = ({elapsedTime, consumedMemory}) => (
    <div className="col-md-12 text-center" style={timeAndMemoryReportStyle}>
            <span>
                <FontAwesome name="clock-o"/> {`${Math.round(elapsedTime)} ms`}
                {" | "}
                <FontAwesome name="database"/> {`${consumedMemory} kb`}
            </span>
    </div>
);

export default TimeAndMemoryReport;
