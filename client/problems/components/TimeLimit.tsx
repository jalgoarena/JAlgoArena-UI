// @flow

import React from 'react';

const TimeLimit = ({timeLimit}: {timeLimit: number}) => (
    <span>
        Time limit is
        {" "}
        <span className="text-success">{timeLimit}</span>
        {" "}
        seconds.
    </span>
);

export default TimeLimit;