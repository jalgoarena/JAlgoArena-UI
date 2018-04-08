import React from 'react';
import {Spinner} from 'spin.js';

export default class ReactSpinner extends React.Component {
    constructor(props) {
        super(props);

        this.spinner = new Spinner(props.config);
        this.spinner.spin(this.refs.container);
    }

    render() {
        return <span ref="container" />;
    }
}