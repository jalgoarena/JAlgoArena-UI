import React from 'react';

export default class MemoryLimit extends React.Component {
    render() {
        return <span>Memory Limit is
            <span className="text-success" id="problem-example-memory-limit">{this.props.memoryLimit}</span> kilobytes.
        </span>;
    }
}