import React from 'react';

export default class ProblemDescription extends React.Component {
    render() {
        return <div>
            <p id="problem-description" className="lead">{this.props.description}</p>
        </div>;
    }
}