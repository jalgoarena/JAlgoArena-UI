// @flow

import React from 'react';
import FontAwesome from '../../common/components/FontAwesome';

const timeAndMemoryReportStyle = {
    marginTop: 3
};

const TimeAndMemoryReport = ({elapsedTime, consumedMemory}: {elapsedTime: number, consumedMemory: number}) => (
    <div className="col-md-12 text-center" style={timeAndMemoryReportStyle}>
            <span>
                <FontAwesome name="clock-o"/> {`${Math.round(elapsedTime)} ms`}
                {" | "}
                <FontAwesome name="database"/> {`${consumedMemory} bytes`}
            </span>
    </div>
);

export default TimeAndMemoryReport;
