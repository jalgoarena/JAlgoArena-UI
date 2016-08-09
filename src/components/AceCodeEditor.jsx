import React from 'react';
import 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/tomorrow_night_eighties';

export default class AceCodeEditor extends React.Component {
    render() {
        const editorStyle = {
            marginTop: 10,
            marginBottom: 10
        };

        return <div style={editorStyle}>
            <AceEditor
                mode="java"
                theme="tomorrow_night_eighties"
                name="editor"
                value={this.props.sourceCode}
                height="350px"
                width="100%"
                editorProps={{$blockScrolling: true}}
            />
        </div>;
    }
}