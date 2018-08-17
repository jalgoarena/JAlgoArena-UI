import * as React from 'react';
import 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/ext/language_tools';
import {CSSProperties} from "react";

interface AceCodeEditorProps {onSourceCodeChanged: (sourceCode: string) => void, sourceCode: string, readOnly: boolean}

const editorStyle: CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AceCodeEditor extends React.Component<AceCodeEditorProps, {}> {

    componentDidMount() {
        this.props.onSourceCodeChanged(this.props.sourceCode);
    }

    render() {

        return <div style={editorStyle}>
            <AceEditor
                mode="java"
                theme="tomorrow_night_eighties"
                name="editor"
                value={this.props.sourceCode}
                onChange={this.props.onSourceCodeChanged}
                height={"450px"}
                width={"100%"}
                editorProps={{$blockScrolling: true}}
                enableBasicAutocompletion={true}
                readOnly={this.props.readOnly}
            />
        </div>;
    }
}