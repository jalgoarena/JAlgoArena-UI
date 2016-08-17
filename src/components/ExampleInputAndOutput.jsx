import React from 'react';

const ExampleInputAndOutput = ({input, output}) => (
    <div>
        <p className="lead">
            <strong>Example</strong>
        </p>
        <p>
            <code>{input}</code>
            {" -> "}
            <code>{output}</code>
        </p>
    </div>
);

export default ExampleInputAndOutput;
