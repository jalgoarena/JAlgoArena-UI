import React from 'react';

import ProblemTitle from './ProblemTitle.jsx';
import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

export default class SubmissionDetails extends React.Component {
    render() {
        return <div className="row">
            <ProblemTitle title={this.props.problem.title}/>
            <ProblemDescription description={this.props.problem.description} />
            <ExampleInputAndOutput
                input={this.props.problem.example.input}
                output={this.props.problem.example.output} />
            <AceCodeEditor sourceCode={this.props.sourceCode || this.props.problem.skeleton_code} />
            <SubmissionPanel
                timeLimit={this.props.problem.time_limit}
                memoryLimit={this.props.problem.memory_limit}
                problemId={this.props.problem.id}
                serverUrl={this.props.serverUrl}
                onCodeSubmitted={this.props.onCodeSubmitted}
                onResultReceived={this.props.onResultReceived}
            />
        </div>;
    }
}
