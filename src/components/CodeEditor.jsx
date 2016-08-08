import React from 'react';

export default class CodeEditor extends React.Component {
    componentDidMount() {
        let editor = ace.edit("editor");
        editor.setTheme("ace/theme/tomorrow_night_eighties");
        editor.getSession().setMode("ace/mode/java");

    }
    render() {
        const editorStyle = {
            marginTop: 10,
            marginBottom: 10,
            height: 350,
        };

        return <div style={editorStyle} id="editor">{this.props.sourceCode}</div>;
    }
}