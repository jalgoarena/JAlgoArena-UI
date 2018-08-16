import * as React from 'react';
import {Spinner} from 'spin.js';

const searchingSpinnerCenterStyle = {
    position: "absolute",
    display: "block",
    top: "50%",
    left: "50%"
};

export default class ReactSpinner extends React.Component {

    componentDidMount() {
        const spinnerOpts = {
            lines: 13,
            length: 20,
            width: 10,
            radius: 30,
            trail: 60
        };

        this.spinner = new Spinner(spinnerOpts);
        this.spinner.spin(this.refs.container);
    }

    render() {
        return <span ref="container" style={searchingSpinnerCenterStyle}/>;
    }
}