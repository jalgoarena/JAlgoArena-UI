import React from 'react';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';

export default class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultProblem: {
                "id": "check-perm",
                "title": "Check Permutations",
                "description": "Given two strings, write a method to decide if one is a permutation of other.",
                "time_limit": 1,
                "memory_limit": 32,
                "example": {
                    "input": "\"abc\", \"cba\"",
                    "output": "true"
                },
                "skeleton_code": "import java.util.*;\nimport org.algohub.engine.type.*;\n\npublic class Solution {\n    /**\n     * @param str1 first string to be checked for permutation match\n     * @param str2 second string to be checked for permutation match\n     * @return  Indicate if one string is a permutation of another\n     */\n    public boolean permutation(String str1, String str2) {\n        // Write your code here\n    }\n}\n",
            },
            result: {status_code: "WAITING"},
            serverUrl: 'https://jalgoarena.herokuapp.com',
            sourceCode: null
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
    render() {
        const problem = this.props.problems.find((problem) => problem.id === this.props.params.id);

        return <div className="container">
            <SubmissionDetails
                problem={problem || this.state.defaultProblem}
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