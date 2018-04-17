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

const Menu = ({user, isConnected, languages}: {user: User, isConnected: boolean, languages: Array}) => (
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
                <MenuItem path="/" prefix="fas" icon="home" title="Home" />
                <MenuItem path="/problems" prefix="far" icon="lightbulb" title="Problems"/>
                <RankingMenuItem languages={languages}/>
                { user ? <MenuItem path="/submissions" prefix="fas" icon="code" title="Submissions" /> : null }
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
        languages: state.config.languages,
    };
};

const MenuPanel = connect(
    mapStateToProps
)(Menu);

export default MenuPanel;