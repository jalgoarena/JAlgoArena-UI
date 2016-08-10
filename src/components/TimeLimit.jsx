import React from 'react';

export default class TimeLimit extends React.Component {
    render() {
        return <span>Time Limit is <span className="text-success" id="problem-example-time-limit"> {this.props.timeLimit}</span> seconds.
        </span>;
    }
}