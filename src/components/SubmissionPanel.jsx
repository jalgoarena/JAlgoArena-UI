import React from 'react';

export default class SubmissionPanel extends React.Component {
    submitCode() {
        this.props.onCodeSubmitted();

        let problemId = $('.btn.active').attr('id');
        let editor = ace.edit("editor");
        let sourceCode = editor.getValue();

        $.ajax({
            type: "POST",
            data: sourceCode,
            processData: false,
            contentType: 'text/plain',
            url: `${this.props.serverUrl}/problems/${problemId}/submit`,
            crossDomain: true
        }).done(this.props.onResultReceived);
    }
    render() {
        return <div>
            <a href="#end-of-output" type="button" className="btn btn-success btn-lg pull-right"
               id="submit-code" onClick={this.submitCode.bind(this)}>
                <span className="glyphicon glyphicon-flash" aria-hidden={true}> </span> Submit</a>
            <span>Time Limit is <span className="text-success"
                                      id="problem-example-time-limit">{this.props.timeLimit}</span> seconds.</span><br />
            <span>Memory Limit is <span className="text-success"
                                        id="problem-example-memory-limit">{this.props.memoryLimit}</span> kilobytes.</span>
        </div>;
    }
}