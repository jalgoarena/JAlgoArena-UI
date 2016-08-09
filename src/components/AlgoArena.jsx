import React from 'react';

import Problems from './Problems.jsx';
import Output from './Output.jsx';
import SubmissionInProgress from './SubmissionInProgress.jsx';
import SubmissionDetails from './SubmissionDetails.jsx';

export default class AlgoArena extends React.Component {
    constructor(props) {
        super(props);
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
            result: {status_code: "WAITING"},
            serverUrl: 'https://jalgoarena.herokuapp.com',
            sourceCode: "import java.util.*;\nimport org.algohub.engine.type.*;\n\npublic class Solution {\n    /**\n     * @param str1 first string to be checked for permutation match\n     * @param str2 second string to be checked for permutation match\n     * @return  Indicate if one string is a permutation of another\n     */\n    public boolean permutation(String str1, String str2) {\n        // Write your code here\n    }\n}\n",
        }
    }
    onCodeSubmitted(sourceCode) {
        $('#SubmissionInProgressSpinner').modal('show');
        this.setState({sourceCode: sourceCode});
    }
    processSubmission(result) {
        $('#SubmissionInProgressSpinner').modal('hide');
        this.setState({result: result});
    }
    updateCurrentProblem(problem) {
        this.setState({
            currentProblem: problem,
            result: {status_code: "WAITING"},
            sourceCode: problem.skeleton_code
        });
    }
    render() {
        return <div className="container">
            <Problems
                serverUrl={this.state.serverUrl}
                onProblemChanged={this.updateCurrentProblem.bind(this)}
            />
            <SubmissionDetails
                problem={this.state.currentProblem}
                serverUrl={this.state.serverUrl}
                sourceCode={this.state.sourceCode}
                onCodeSubmitted={this.onCodeSubmitted.bind(this)}
                onResultReceived={this.processSubmission.bind(this)}
            />
            <Output result={this.state.result} />
            <SubmissionInProgress />
        </div>
    }
}