import React from 'react';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';

export default class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {
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
    componentDidMount() {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: `${this.state.serverUrl}/problems/${this.props.params.id}`,
            crossDomain: true,
            success: (problem) => {
                this.setState({problem: problem, sourceCode: problem.skeleton_code});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
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
        return <div className="container">
            <SubmissionDetails
                problem={this.state.problem}
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