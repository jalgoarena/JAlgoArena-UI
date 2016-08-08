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
            },
            result: {"status_code": "WAITING"}
        }
    }
    onCodeSubmitted() {
        $('#SubmissionInProgressSpinner').modal('show');
    }
    processSubmission(result) {
        this.setState({result: result});

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
            <Output result={this.state.result}>
                <h2 className="text-info text-center">Submit your code to see results</h2>
            </Output>
            <SubmissionInProgressSpinner />
        </div>
    }
}