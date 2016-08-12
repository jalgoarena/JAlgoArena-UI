import React from 'react';

import Output from '../components/Output.jsx';
import SubmissionInProgress from '../components/SubmissionInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';

const Problem = React.createClass({
    getInitialState: function() {
        return {
            result: {status_code: "WAITING"}
        };
    },
    getInitialProps: function () {
        return {
            problems: [
                {
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
                }
            ]
        };
    },
    onCodeSubmitted: function(sourceCode) {
        $('#SubmissionInProgressSpinner').modal('show');

        $.ajax({
            type: "POST",
            data: sourceCode,
            processData: false,
            contentType: 'text/plain',
            url: `https://jalgoarena.herokuapp.com/problems/${this.props.params.id}/submit`,
            crossDomain: true
        }).done((data) => {
            $('#SubmissionInProgressSpinner').modal('hide');
            this.setState({sourceCode: sourceCode, result: data});
        });
    },
    render: function() {
        let problem = this.props.problems.find((problem) => problem.id === this.props.params.id)
            || this.props.problems[0];

        return <div className="container">
            <SubmissionDetails
                problem={problem}
                sourceCode={this.state.sourceCode || problem.skeleton_code}
                onCodeSubmitted={this.onCodeSubmitted}
            />
            <Output result={this.state.result} />
            <SubmissionInProgress />
        </div>;
    }
});

module.exports = Problem;