import React from 'react';

export default class SubmissionFailed extends React.Component {
    render() {
        return <h2 className="text-danger text-center">{this.props.children}</h2>;
    }
}