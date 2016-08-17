import React from 'react';
import {Row, PageHeader} from 'react-bootstrap';

import ProblemDescription from './ProblemDescription.jsx';
import ExampleInputAndOutput from './ExampleInputAndOutput.jsx';
import AceCodeEditor from './AceCodeEditor.jsx';
import SubmissionPanel from './SubmissionPanel.jsx';

export default class SubmissionDetails extends React.Component {
    render() {
        return <Row>
            <PageHeader>{this.props.problem.title}</PageHeader>
            <ProblemDescription description={this.props.problem.description} />
            <ExampleInputAndOutput
                input={this.props.problem.example.input}
                output={this.props.problem.example.output} />
            <AceCodeEditor sourceCode={this.props.sourceCode || this.props.problem.skeleton_code} />
            <SubmissionPanel
                timeLimit={this.props.problem.time_limit}
                memoryLimit={this.props.problem.memory_limit}
                problemId={this.props.problem.id}
                sourceCode={this.props.sourceCode}
            />
        </Row>;
    }
}
