import React from 'react';

export default class ExampleInputAndOutput extends React.Component {
    render() {
        return <div>
            <p className="lead">
                <strong>Example</strong>
            </p>
            <p>
                <code>{this.props.input}</code>
                    ->
                <code>{this.props.output}</code>
            </p>
        </div>;
    }
}