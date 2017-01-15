import React from "react";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import store from './store';
import DevTools from './devtools';

export const Layout = React.createClass({
    render: function() {
        let devTools = <DevTools store={store} />;
        if (process.env.NODE_ENV === 'production') {
            devTools = null;
        }

        return <div>
            { <Menu store={store} /> }
            { devTools }
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    }
});
