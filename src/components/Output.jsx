import React from 'react';
import SubmissionResult from './SubmissionResult.jsx';

export default class Output extends React.Component {
    render() {
        const outputStyle = {
            marginTop: 30,
            borderRadius: 10,
            border: "1px solid black",
            padding: "0 10px 10px",
        };

        return <div className="row output" style={outputStyle} id="output">
            <SubmissionResult
                statusCode={this.props.result.status_code}
                elapsedTime={this.props.result.elapsed_time}
                consumedMemory={this.props.result.consumed_memory}
                testcaseResults={this.props.result.testcase_results}
                errorMessage={this.props.result.error_message}
            />
        </div>;
    }
}