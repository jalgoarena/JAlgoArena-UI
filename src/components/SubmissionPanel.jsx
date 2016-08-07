import React from 'react';

export default class SubmissionPanel extends React.Component {
    submitCode() {
        $('#SubmissionInProgressSpinner').modal('show');

        let problemId = $('.btn.active').attr('id');
        let editor = ace.edit("editor");
        let sourceCode = editor.getValue();

        $.ajax({
            type: "POST",
            data: sourceCode,
            processData: false,
            contentType: 'text/plain',
            url: `${this.props.serverUrl}/problems/${problemId}/solution`,
            crossDomain: true
        }).done(processSubmission);

        function processSubmission(result) {
            let $output = $('#output');

            switch (result.status_code) {
                case 'ACCEPTED':
                    $output.html('<h2 class="text-success text-center">All test cases passed, congratulations!</h2>');

                    result.testcase_results.forEach((testCasePassed, i) =>
                        $output.append(
                            `<div class="col-md-3">
                        <span class="glyphicon glyphicon-${(testCasePassed ? 'ok' : 'remove')} 
                                text-${(testCasePassed ? 'success' : 'danger')}" 
                                aria-hidden="true">
                        </span> Test Case #${(i + 1)}
                    </div>`
                        )
                    );
                    break;
                case 'WRONG_ANSWER':
                    $output.html('<h2 class="text-danger text-center">Wrong Answer</h2>');

                    result.testcase_results.forEach((testCasePassed, i) =>
                        $output.append(
                            `<div class="col-md-3">
                        <span class="glyphicon glyphicon-${(testCasePassed ? 'ok' : 'remove')} 
                              text-${(testCasePassed ? 'success' : 'danger')}" 
                              aria-hidden="true">
                        </span> Test Case #${(i + 1)}
                    </div>`
                        )
                    );

                    break;
                case 'COMPILE_ERROR':
                    $output.html('<h2 class="text-danger text-center">Compilation Error</h2>');
                    $output.append(`<p>${result.error_message}</p>`);
                    break;
                case 'RUNTIME_ERROR':
                    $output.html(
                        `<div class="alert alert-danger" role="alert">Runtime Error: ${result.error_message}</div>`
                    );
                    break;
                case 'TIME_LIMIT_EXCEEDED':
                    $output.html('<h2 class="text-danger text-center">Time Limit Exceeded</h2>');
                    break;
                case 'MEMORY_LIMIT_EXCEEDED':
                    $output.html('<div class="alert alert-danger" role="alert">Memory Limit Exceeded!</div>');
                    break;
            }

            $('#SubmissionInProgressSpinner').modal('hide');
        }
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