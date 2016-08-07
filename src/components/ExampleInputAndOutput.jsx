import React from 'react';

export default class ExampleInputAndOutput extends React.Component {
    render() {
        return <div>
            <p className="lead">
                <strong>Example</strong>
            </p>
            <p>
                <code id="problem-example-input">{this.props.input}</code>
                    ->
                <code id="problem-example-output">{this.props.output}</code>
            </p>
        </div>;
    }
}