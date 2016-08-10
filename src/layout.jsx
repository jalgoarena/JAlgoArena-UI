"use strict";

import React from "react";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";

export default class Layout extends React.Component {
    render() {
        return <div>
            <Menu />
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    }
}