import React from 'react';

import TimeAndMemoryReport from './TimeAndMemoryReport.jsx';
import SubmissionFailed from './SubmissionFailed.jsx';

export default class SubmissionResult extends React.Component {
    render() {
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
                    <SubmissionFailed>Wrong Answer</SubmissionFailed>
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
                    <SubmissionFailed>Compilation Error</SubmissionFailed>
                    <pre>{this.props.result.error_message}</pre>
                </div>;
            case 'RUNTIME_ERROR':
                return <div>
                    <SubmissionFailed>Runtime Error</SubmissionFailed>
                    <pre>{this.props.result.error_message}</pre>
                </div>;
            case 'MEMORY_LIMIT_EXCEEDED':
                return <SubmissionFailed>Memory Limit Exceeded!</SubmissionFailed>;
            case 'TIME_LIMIT_EXCEEDED':
                return <SubmissionFailed>Time Limit Exceeded</SubmissionFailed>;
            default:
                return <SubmissionFailed>Unsupported status code: {this.props.result.status_code}</SubmissionFailed>;
        }
    }
}
