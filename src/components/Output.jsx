import React from 'react';
import SubmissionResult from './SubmissionResult.jsx';

export default class Output extends React.Component {
    render() {
        const outputStyle = {
            marginTop: 30,
            borderRadius: 10,
            border: "1px solid black",
            padding: "0 10px 10px",
        };

        return <div className="row output" style={outputStyle} id="output">
            <SubmissionResult result={this.props.result}/>
        </div>;
    }
}