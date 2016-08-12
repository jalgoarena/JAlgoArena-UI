import React from 'react';

import ProblemTitle from './ProblemTitle.jsx';
import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

const SubmissionDetails = React.createClass({
    getInitialProps: function () {
        return {
            problem: {
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
        }
    },
    render() {
        return <div className="row">
            <ProblemTitle title={this.props.problem.title}/>
            <ProblemDescription description={this.props.problem.description} />
            <ExampleInputAndOutput
                input={this.props.problem.example.input}
                output={this.props.problem.example.output} />
            <AceCodeEditor sourceCode={this.props.problem.skeleton_code} />
            <SubmissionPanel
                timeLimit={this.props.problem.time_limit}
                memoryLimit={this.props.problem.memory_limit}
                problemId={this.props.problem.id}
            />
        </div>;
    }
});

module.exports = SubmissionDetails;
