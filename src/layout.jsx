import React from "react";

import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import store from './store';
import DevTools from './devtools';
import {fetchProblems} from "./actions";

export const Layout = React.createClass({
    componentDidMount: function() {
        store.dispatch(fetchProblems());
    },
    render: function() {
        return <div>
            <Menu />
            <DevTools store={store}  />
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    }
});
