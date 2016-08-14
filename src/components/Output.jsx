import React from 'react';
import {Row} from 'react-bootstrap';

import SubmissionResult from './SubmissionResult.jsx';

export default class Output extends React.Component {
    render() {
        const outputStyle = {
            marginTop: 30,
            borderRadius: 10,
            border: "1px solid black",
            padding: "0 10px 10px",
        };

        return <Row style={outputStyle}>
            <SubmissionResult result={this.props.result}/>
        </Row>;
    }
}