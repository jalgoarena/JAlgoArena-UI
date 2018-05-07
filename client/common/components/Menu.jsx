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
import logo from '../../assets/img/logo.png';

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

const Menu = ({user, isConnected, currentPath}: {user: User, isConnected: boolean, currentPath: string}) => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Toggle/>
            <a className="navbar-brand" href="/">
                <img src={logo} style={logoStyle}/>&nbsp;
                <WebSocketConnectionIndicator isConnected={isConnected}/>
            </a>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav role="navigation" pullRight id="menu">
                <MenuItem path="/" prefix="fas" icon="home" title="Home"  currentPath={currentPath}/>
                <MenuItem path="/problems" prefix="far" icon="lightbulb" title="Problems" currentPath={currentPath}/>
                <RankingMenuItem  currentPath={currentPath}/>
                { user ? <MenuItem path="/submissions" prefix="fas" icon="code" title="Submissions" currentPath={currentPath} /> : null }
                <ProfileOrLoginMenuItem user={user} currentPath={currentPath}/>
                <AdminMenuItem user={user} currentPath={currentPath}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isConnected: state.webSocketConnected,
        currentPath: state.routing.locationBeforeTransitions.pathname
    };
};

const MenuPanel = connect(
    mapStateToProps
)(Menu);

export default MenuPanel;