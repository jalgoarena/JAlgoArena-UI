import React from 'react';

export default class ProblemTitle extends React.Component {
    render() {
        return <h1 className="page-header" id="problem-title">{this.props.title}</h1>;
    }
}