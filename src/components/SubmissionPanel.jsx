import React from 'react';

export default class SubmissionPanel extends React.Component {
    submitCode() {
        this.props.onCodeSubmitted();

        let editor = ace.edit("editor");
        let sourceCode = editor.getValue();

        $.ajax({
            type: "POST",
            data: sourceCode,
            processData: false,
            contentType: 'text/plain',
            url: `${this.props.serverUrl}/problems/${this.props.problemId}/submit`,
            crossDomain: true
        }).done(this.props.onResultReceived);
    }
    render() {
        const submitButtonStyle = {
            width: 200
        };

        return <div>
            <a href="#end-of-output" type="button" className="btn btn-success btn-lg pull-right"
               onClick={this.submitCode.bind(this)} style={submitButtonStyle}>
                <span className="glyphicon glyphicon-flash" aria-hidden={true}> </span> Submit</a>
            <span>Time Limit is <span className="text-success"
                                      id="problem-example-time-limit">{this.props.timeLimit}</span> seconds.</span><br />
            <span>Memory Limit is <span className="text-success"
                                        id="problem-example-memory-limit">{this.props.memoryLimit}</span> kilobytes.</span>
        </div>;
    }
}
