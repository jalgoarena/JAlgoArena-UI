"use strict";
import React from "react";
import {Link} from "react-router";
import {Navbar, Nav} from "react-bootstrap";

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

        return <Navbar fixedTop fluid>
            <Navbar.Header>
                <Navbar.Toggle/>
                <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle} /></a>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav role="navigation" pullRight>
                    <li><Link activeStyle={activeStyle} to="/"><i className="fa fa-home fa-lg"> </i> Home</Link></li>
                    <li><Link activeStyle={activeStyle} to="/problems"><i className="fa fa-lightbulb-o fa-lg"> </i> Problems</Link></li>
                    <li><Link activeStyle={activeStyle} to="/leaderboard"><i className="fa fa-trophy fa-lg"> </i> Leaderboard</Link></li>
                    <li><Link activeStyle={activeStyle} to="/profile"><i className="fa fa-user fa-lg"> </i> Profile</Link></li>
                </Nav>
            </Navbar.Collapse>
        </Navbar>;
    }
}