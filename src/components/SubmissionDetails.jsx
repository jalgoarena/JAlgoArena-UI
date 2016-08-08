import React from 'react';

import ProblemTitle from './ProblemTitle.jsx';
import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import CodeEditor from './CodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

export default class SubmissionDetails extends React.Component {
    render() {
        return <div className="row">
            <ProblemTitle title={this.props.problem.title}/>
            <ProblemDescription description={this.props.problem.description} />
            <ExampleInputAndOutput
                input={this.props.problem.example.input}
                output={this.props.problem.example.output} />
            <CodeEditor sourceCode={`import java.util.*;
import org.algohub.engine.type.*;

public class Solution {
    /**
     * @param str1 first string to be checked for permutation match
     * @param str2 second string to be checked for permutation match
     * @return  Indicate if one string is a permutation of another
     */
    public boolean permutation(String str1, String str2) {
        // Write your code here
    }
}`} />
            <SubmissionPanel
                timeLimit={this.props.problem.time_limit}
                memoryLimit={this.props.problem.memory_limit}
                serverUrl={this.props.serverUrl}
                onCodeSubmitted={this.props.onCodeSubmitted}
                onResultReceived={this.props.onResultReceived}
            />
        </div>;
    }
}