import React from 'react';
import SubmitButton from './SubmitButton.jsx';
import MemoryLimit from './MemoryLimit.jsx';
import TimeLimit from './TimeLimit.jsx';

export default class SubmissionPanel extends React.Component {
    render() {
        return <div>
            <SubmitButton problemId={this.props.problemId}/>
            <TimeLimit timeLimit={this.props.timeLimit} />
            <br />
            <MemoryLimit memoryLimit={this.props.memoryLimit} />
        </div>;
    }
}
