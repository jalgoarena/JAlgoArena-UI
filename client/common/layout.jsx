import React from "react";

import MenuPanel from "./components/Menu";
import Footer from "./components/Footer";
import ErrorMessageBox from "./components/ErrorMessage";
import WorkInProgress from "./components/WorkInProgress";
import store from './store';
import DevTools from './devtools';

export const Layout = React.createClass({
    render: function() {
        let devTools = <DevTools store={store} />;
        if (process.env.NODE_ENV === 'production') {
            devTools = null;
        }

        return <div>
            { React.cloneElement(<MenuPanel />, this.state) }
            { React.cloneElement(<ErrorMessageBox />, this.state) }
            { React.cloneElement(<WorkInProgress />, this.state) }
            { devTools }
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    }
});
