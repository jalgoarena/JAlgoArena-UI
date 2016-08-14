import React from 'react';

export default class ProblemTitle extends React.Component {
    render() {
        return <h1 id="problem-title">{this.props.title}</h1>;
    }
}