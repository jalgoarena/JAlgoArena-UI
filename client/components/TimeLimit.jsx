import React from 'react';

const TimeLimit = ({timeLimit}) => (
    <span>
        Time limit is
        {" "}
        <span className="text-success">{timeLimit}</span>
        {" "}
        seconds.
    </span>
);

export default TimeLimit;