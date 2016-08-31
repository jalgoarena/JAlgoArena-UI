import React from 'react';
import 'brace';
import AceEditor from 'react-ace';
import {Alert} from 'react-bootstrap';

import 'brace/mode/java';
import 'brace/theme/tomorrow_night_eighties';

export default class AceCodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCheating: false};
    }
    componentDidMount() {
        this.props.onSourceCodeChanged(this.props.sourceCode);
    }
    render() {
        const editorStyle = {
            marginTop: 10,
            marginBottom: 10
        };

        if (this.state.isCheating) {
            return <div style={editorStyle}>
                <Alert bsStyle="danger">
                    <h4>Oh snap! You are cheating!</h4>
                    <p>Please refresh page to continue and please stop pasting ready to go code. Be fair, as it is supposed to be fun and fair game.</p>
                </Alert>
            </div>;
        }

        return <div style={editorStyle}>
            <AceEditor
                mode="java"
                theme="tomorrow_night_eighties"
                name="editor"
                value={this.props.sourceCode}
                onChange={this.props.onSourceCodeChanged}
                onPaste={() => {
                    this.setState({isCheating: true});
                }}
                height="350px"
                width="100%"
                editorProps={{$blockScrolling: true}}
            />
        </div>;
    }
}