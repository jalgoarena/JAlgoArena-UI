import React from 'react';

import ProblemTitle from './ProblemTitle.jsx';
import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import CodeEditor from './CodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

export default class SubmissionDetails extends React.Component {
    render() {
        return <div className="row">
            <ProblemTitle title="Check Permutations"/>
            <ProblemDescription description="Given two strings, write a method to decide if one is a permutation of other." />
            <ExampleInputAndOutput input='"abc", "cba"' output="true" />
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
            <SubmissionPanel timeLimit="1" memoryLimit="32" />
        </div>;
    }
}