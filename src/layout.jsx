import React from "react";

import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import store from './stores';
import DevTools from './devtools';
import {fetchProblems} from "./actions";

export const Layout = React.createClass({
    componentDidMount: function() {
        store.dispatch(fetchProblems());
        this.setState({result: {status_code: 'WAITING'}, showModal: false});
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
