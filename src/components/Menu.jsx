"use strict";
import React from "react";

export default class Menu extends React.Component {
    render() {
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
                    <a className="navbar-brand" href="#"><img src="img/logo.png" className="logo" /></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-globe" aria-hidden="true"> </span> Leaderboard</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-cog" aria-hidden="true"> </span> Settings</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-user" aria-hidden="true"> </span> Profile</a></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}