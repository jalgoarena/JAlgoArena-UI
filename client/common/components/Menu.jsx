// @flow

import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from 'react-redux';

import AdminMenuItem from "./AdminMenuItem";
import ProfileOrLoginMenuItem from "./ProfileOrLoginMenuItem";
import MenuItem from "./MenuItem";
import RankingMenuItem from "./RankingMenuItem";
import User from "../../users/domain/User";
import WebSocketConnectionIndicator from "./WebSocketConnectionIndicator";

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

const Menu = ({user, isConnected}: {user: User, isConnected: boolean}) => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Toggle/>
            <a className="navbar-brand" href="/">
                <img src="img/logo.png" style={logoStyle}/>&nbsp;
                <WebSocketConnectionIndicator isConnected={isConnected}/>
            </a>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav role="navigation" pullRight id="menu">
                <MenuItem path="/" icon="home" title="Home" />
                <MenuItem path="/problems" icon="lightbulb-o" title="Problems"/>
                <RankingMenuItem />
                { user ? <MenuItem path="/submissions" icon="code" title="Submissions" /> : null }
                <ProfileOrLoginMenuItem user={user}/>
                <AdminMenuItem user={user}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isConnected: state.webSocketConnected,
        routing: state.routing
    };
};

const MenuPanel = connect(
    mapStateToProps
)(Menu);

export default MenuPanel;