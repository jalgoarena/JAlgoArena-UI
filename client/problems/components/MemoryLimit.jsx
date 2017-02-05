// @flow

import React from 'react';

const MemoryLimit = ({memoryLimit}: {memoryLimit: number}) => (
    <span>Memory limit is
        {" "}
        <span className="text-success"> {memoryLimit}</span>
        {" "}
        kilobytes.
    </span>
);

export default MemoryLimit;
