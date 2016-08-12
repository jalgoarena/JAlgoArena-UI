import React from 'react';

export default class SubmitButton extends React.Component {

    submitCode() {
        this.props.onCodeSubmitted();
    }

    render() {
        const submitButtonStyle = {
            width: 200
        };

        return <button
                  type="button"
                  className="btn btn-success btn-lg pull-right"
                  onClick={this.submitCode.bind(this)}
                  style={submitButtonStyle}>
            <i className="fa fa-send"> </i> Submit
        </button>;
    }
}