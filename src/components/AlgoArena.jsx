import React from 'react';

import Problems from './Problems.jsx';
import Output from './Output.jsx';
import SubmissionInProgressSpinner from './SubmissionInProgressSpinner.jsx';
import SubmissionDetails from './SubmissionDetails.jsx';

export default class AlgoArena extends React.Component {
    constructor(props) {
        super(props);
        this.serverUrl = 'https://jalgoarena.herokuapp.com';
        this.state = {
            currentProblem: {
                "id": "check-perm",
                "title": "Check Permutations",
                "description": "Given two strings, write a method to decide if one is a permutation of other.",
                "time_limit": 1,
                "memory_limit": 32,
                "example": {
                    "input": "\"abc\", \"cba\"",
                    "output": "true"
                }
            }
        }
    }
    onCodeSubmitted() {
        $('#SubmissionInProgressSpinner').modal('show');
    }
    processSubmission(result) {
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
    updateCurrentProblem(problem) {
        $('#output').html('<h2 class="text-info text-center">Submit your code to see results</h2>');

        this.setState({currentProblem: problem});

        let editor = ace.edit("editor");
        editor.setValue(problem.skeleton_code, 1);
    }
    render() {
        return <div className="container">
            <Problems
                serverUrl={this.serverUrl}
                onProblemChanged={this.updateCurrentProblem.bind(this)}
            />
            <SubmissionDetails
                problem={this.state.currentProblem}
                serverUrl={this.serverUrl}
                onCodeSubmitted={this.onCodeSubmitted.bind(this)}
                onResultReceived={this.processSubmission.bind(this)}
            />
            <Output>
                <h2 className="text-info text-center">Submit your code to see results</h2>
            </Output>
            <SubmissionInProgressSpinner />
        </div>
    }
}