import React from 'react';
import Reflux from 'reflux';

import {SourceCodeStore} from "../stores/sourceCode.js";

const SubmitButton = React.createClass({
    mixins: [
        Reflux.listenTo(
            SourceCodeStore, 'onChangedSourceCode'
        )
    ],
    submitCode: function () {
        this.props.onCodeSubmitted(this.state.sourceCode);
    },
    onChangedSourceCode: function (sourceCode) {
        this.setState({sourceCode: sourceCode});
    },
    render: function() {
        const submitButtonStyle = {
            width: 200
        };

        return <button
            type="button"
            className="btn btn-success btn-lg pull-right"
            onClick={this.submitCode}
            style={submitButtonStyle}>
            <i className="fa fa-send"> </i> Submit
        </button>;
    }
});

module.exports = SubmitButton;