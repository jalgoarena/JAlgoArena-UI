"use strict";
import React from "react";
import {Link} from "react-router";

export default class Menu extends React.Component {
    render() {
        const logoStyle =  {
            display: "inline-block",
            height: 35,
            marginTop: -5
        };

        const activeStyle = {
            color: "#3c763d"
        };

        return <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"> </span>
                        <span className="icon-bar"> </span>
                        <span className="icon-bar"> </span>
                    </button>
                    <a className="navbar-brand" href="#"><img src="img/logo.png" style={logoStyle} /></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link activeStyle={activeStyle} to="/problems"><span className="glyphicon glyphicon-fire" aria-hidden="true"> </span> Problems</Link></li>
                        <li><Link activeStyle={activeStyle} to="/leaderboard"><span className="glyphicon glyphicon-globe" aria-hidden="true"> </span> Leaderboard</Link></li>
                        <li><Link activeStyle={activeStyle} to="/profile"><span className="glyphicon glyphicon-user" aria-hidden="true"> </span> Profile</Link></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}