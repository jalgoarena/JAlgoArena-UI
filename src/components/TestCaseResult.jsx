import React from 'react';
import FontAwesome from './FontAwesome';

export default class TestCaseResult extends React.Component {
    render() {
        if (this.props.passed) {
            return <div className="col-md-3">
                <span className="text-success">
                    <FontAwesome name="check"/>
                </span> Test Case #{this.props.id}
            </div>;
        } else {
            return <div className="col-md-3">
                <span className="text-danger">
                    <FontAwesome name="times"/>
                </span> Test Case #{this.props.id}
            </div>;
        }
    }
}