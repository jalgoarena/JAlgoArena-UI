"use strict";

import React from "react";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import AlgoArena from "./components/AlgoArena.jsx";

export default class Layout extends React.Component {
    render() {
        return <div>
            <Menu />
            <AlgoArena />
            <Footer />
        </div>;
    }
}