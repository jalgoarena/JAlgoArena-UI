"use strict";
import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div id="end-of-output">
                    <hr/>
                </div>
                <div className="container">

                    <div className="col-md-5">
                        <span>Copyright © Jacek Spólnik 2016. All rights reserved.</span>
                    </div>
                    <div className="col-md-7">
                        <img src="img/logo.png" className="img-responsive footer-logo"/>
                    </div>
                </div>
            </footer>
        );
    }
}
