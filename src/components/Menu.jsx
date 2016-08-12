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
                    <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle} /></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link activeStyle={activeStyle} to="/"><i className="fa fa-home fa-lg"> </i> Home</Link></li>
                        <li><Link activeStyle={activeStyle} to="/problems"><i className="fa fa-lightbulb-o fa-lg"> </i> Problems</Link></li>
                        <li><Link activeStyle={activeStyle} to="/leaderboard"><i className="fa fa-trophy fa-lg"> </i> Leaderboard</Link></li>
                        <li><Link activeStyle={activeStyle} to="/profile"><i className="fa fa-user fa-lg"> </i> Profile</Link></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}