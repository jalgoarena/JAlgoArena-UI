import React from 'react';
import 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/kotlin';
import 'brace/theme/tomorrow_night_eighties';

export default class AceCodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fullScreen: false};
        this.fullScreenToggle = this.fullScreenToggle.bind(this);
    }

    componentDidMount() {
        this.props.onSourceCodeChanged(this.props.sourceCode);
    }

    fullScreenToggle(editor, fullScreen) {
        if (fullScreen == this.state.fullScreen)
            return;

        this.setState({fullScreen: fullScreen});
        editor.setAutoScrollEditorIntoView(fullScreen);
        editor.resize();
    }

    render() {
        const editorStyle = {
            marginTop: 10,
            marginBottom: 10
        };

        return <div style={editorStyle}>
            <AceEditor
                className={this.state.fullScreen ? "fullScreen" : ""}
                mode={this.props.activeLanguage}
                theme="tomorrow_night_eighties"
                name="editor"
                value={this.props.sourceCode}
                onChange={this.props.onSourceCodeChanged}
                height={this.state.fullScreen ? "auto" : "350px"}
                width={this.state.fullScreen ? "auto" : "100%"}
                editorProps={{$blockScrolling: true}}
                commands={[
                    {
                        name: "Show Fullscreen",
                        bindKey: "F3",
                        exec: (editor) => this.fullScreenToggle(editor, true)
                    },
                    {
                        name: "Hide Fullscreen",
                        bindKey: "Esc",
                        exec: (editor) => this.fullScreenToggle(editor, false)
                    },
                ]}
            />
        </div>;
    }
}