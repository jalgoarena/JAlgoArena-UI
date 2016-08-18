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
        let devTools = <DevTools store={store} />;
        if (process.env.NODE_ENV === 'production') {
            devTools = null;
        }

        return <div>
            <Menu />
            { devTools }
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    }
});
