// @flow

import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from 'react-redux';

import AdminMenuItem from "./AdminMenuItem";
import ProfileOrLoginMenuItem from "./ProfileOrLoginMenuItem";
import MenuItem from "./MenuItem";
import User from "../../users/domain/User";

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

const Menu = ({user}: {user: User}) => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Toggle/>
            <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle}/></a>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav role="navigation" pullRight id="menu">
                <MenuItem path="/" icon="home" title="Home" />
                <MenuItem path="/problems" icon="lightbulb-o" title="Problems"/>
                <MenuItem path="/leaderboard" icon="trophy" title="Rank"/>
                <ProfileOrLoginMenuItem user={user}/>
                <AdminMenuItem user={user}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        routing: state.routing
    };
};

const MenuPanel = connect(
    mapStateToProps
)(Menu);

export default MenuPanel;