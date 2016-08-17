"use strict";
import React from "react";
import {Link} from "react-router";
import {Navbar, Nav} from "react-bootstrap";
import FontAwesome from './FontAwesome';

const logoStyle =  {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

const activeStyle = {
    color: "#3c763d"
};

const Menu = () => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Toggle/>
            <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle} /></a>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav role="navigation" pullRight>
                <li><Link activeStyle={activeStyle} to="/">
                    <FontAwesome name="home" lg={true}/> Home
                </Link></li>
                <li><Link activeStyle={activeStyle} to="/problems">
                    <FontAwesome name="lightbulb-o" lg={true}/>  Problems
                </Link></li>
                <li><Link activeStyle={activeStyle} to="/leaderboard">
                    <FontAwesome name="trophy" lg={true}/> Leaderboard
                </Link></li>
                <li><Link activeStyle={activeStyle} to="/profile">
                    <FontAwesome name="user" lg={true}/> Profile
                </Link></li>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Menu;
