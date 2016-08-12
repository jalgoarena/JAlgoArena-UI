import React from 'react';
import Reflux from 'reflux';

import TimeAndMemoryReport from './TimeAndMemoryReport.jsx';
import {SubmissionStore} from "../stores/submission.js";

const SubmissionResult = React.createClass({
    mixins: [
        Reflux.listenTo(
            SubmissionStore, 'onSendSubmission'
        )
    ],
    getInitialState() {
        return {
            result: {
                status_code: "WAITING",
                error_message: "",
                elapsed_time: 0,
                consumed_memory: 0,
                testcase_results: []
            }
        };
    },
    onSendSubmission: function (result) {
        this.setState({result: result});
    },
    render: function() {
        switch (this.state.result.status_code) {
            case 'WAITING':
                return <h2 className="text-info text-center">Submit your code to see results</h2>;
            case 'ACCEPTED':
                return <div>
                    <h2 className="text-success text-center">All test cases passed, congratulations!</h2>
                    {this.state.result.testcase_results.map((result, i) =>
                        <div className="col-md-3" key={i}>
                            <span className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                                  aria-hidden="true">
                            </span> Test Case #{i + 1}
                        </div>
                    )}
                    <TimeAndMemoryReport elapsedTime={this.state.result.elapsed_time} consumedMemory={this.state.result.consumed_memory} />
                </div>;
            case 'WRONG_ANSWER':
                return <div>
                    <h2 className="text-danger text-center">Wrong Answer</h2>
                    {this.state.result.testcase_results.map((result, i) =>
                        <div className="col-md-3" key={i}>
                            <span className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                                  aria-hidden="true">
                            </span> Test Case #{i + 1}
                        </div>
                    )}
                </div>;
            case 'COMPILE_ERROR':
                return <div>
                    <h2 className="text-danger text-center">Compilation Error</h2>
                    <pre>{this.state.result.error_message}</pre>
                </div>;
            case 'RUNTIME_ERROR':
                return <div>
                    <h2 className="text-danger text-center">Runtime Error</h2>
                    <pre>{this.state.result.error_message}</pre>
                </div>;
            case 'TIME_LIMIT_EXCEEDED':
                return <h2 className="text-danger text-center">Time Limit Exceeded</h2>;
            case 'MEMORY_LIMIT_EXCEEDED':
                return <div className="alert alert-danger" role="alert">Memory Limit Exceeded!</div>;
            default:
                return <h2 className="text-danger text-center">Unsupported status code: {this.state.result.status_code}</h2>;
        }
    }
});

module.exports = SubmissionResult;