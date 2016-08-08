import React from 'react';
import Remarkable from 'remarkable';

export default class ProblemDescription extends React.Component {
    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.description.toString());
        return { __html: rawMarkup };
    }
    render() {
        return <div>
            <p id="problem-description" className="lead">
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </p>
        </div>;
    }
}