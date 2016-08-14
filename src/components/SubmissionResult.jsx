import React from 'react';

import TimeAndMemoryReport from './TimeAndMemoryReport.jsx';

const SubmissionResult = React.createClass({
    render: function () {
        if (!this.props.result) {
            return null;
        }

        switch (this.props.result.status_code) {
            case 'WAITING':
                return <h2 className="text-info text-center">Submit your code to see results</h2>;
            case 'ACCEPTED':
                return <div>
                    <h2 className="text-success text-center">All test cases passed, congratulations!</h2>
                    {this.props.result.testcase_results.map((result, i) =>
                        <div className="col-md-3" key={i}>
                            <span
                                className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                                aria-hidden="true">
                            </span> Test Case #{i + 1}
                        </div>
                    )}
                    <TimeAndMemoryReport elapsedTime={this.props.result.elapsed_time}
                                         consumedMemory={this.props.result.consumed_memory}/>
                </div>;
            case 'WRONG_ANSWER':
                return <div>
                    <h2 className="text-danger text-center">Wrong Answer</h2>
                    {this.props.result.testcase_results.map((result, i) =>
                        <div className="col-md-3" key={i}>
                            <span
                                className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                                aria-hidden="true">
                            </span> Test Case #{i + 1}
                        </div>
                    )}
                </div>;
            case 'COMPILE_ERROR':
                return <div>
                    <h2 className="text-danger text-center">Compilation Error</h2>
                    <pre>{this.props.result.error_message}</pre>
                </div>;
            case 'RUNTIME_ERROR':
                return <div>
                    <h2 className="text-danger text-center">Runtime Error</h2>
                    <pre>{this.props.result.error_message}</pre>
                </div>;
            case 'TIME_LIMIT_EXCEEDED':
                return <h2 className="text-danger text-center">Time Limit Exceeded</h2>;
            case 'MEMORY_LIMIT_EXCEEDED':
                return <div className="alert alert-danger" role="alert">Memory Limit Exceeded!</div>;
            default:
                return <h2 className="text-danger text-center">Unsupported status
                    code: {this.props.result.status_code}</h2>;
        }
    }
});

module.exports = SubmissionResult;