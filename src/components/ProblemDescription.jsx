import React from 'react';
import Markdown from 'react-remarkable';

export default class ProblemDescription extends React.Component {
    render() {
        return <div id="problem-description" className="lead">
            <Markdown source={this.props.description}/>
        </div>;
    }
}