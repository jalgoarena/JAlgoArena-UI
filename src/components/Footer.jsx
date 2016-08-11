"use strict";
import React from "react";

export default class Footer extends React.Component {
    render() {
        const footerLogoStyle = {
            height: 50,
            marginBottom: 15
        };

        return (
            <footer className="footer">
                <div id="end-of-output">
                    <hr/>
                </div>
                <div className="container">

                    <div className="col-md-5">
                        <span><i className="fa fa-copyright"> </i> Jacek Spólnik 2016</span>
                    </div>
                    <div className="col-md-7">
                        <img src="img/logo.png" className="img-responsive" style={footerLogoStyle}/>
                    </div>
                </div>
            </footer>
        );
    }
}
