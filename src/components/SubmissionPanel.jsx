import React from 'react';

export default class SubmissionPanel extends React.Component {
    render() {
        return <div>
            <a href="#end-of-output" type="button" className="btn btn-success btn-lg pull-right"
               id="submit-code">
                <span className="glyphicon glyphicon-flash" aria-hidden={true}> </span> Submit</a>
            <span>Time Limit is <span className="text-success"
                                      id="problem-example-time-limit">{this.props.timeLimit}</span> seconds.</span><br />
            <span>Memory Limit is <span className="text-success"
                                        id="problem-example-memory-limit">{this.props.memoryLimit}</span> kilobytes.</span>
        </div>;
    }
}