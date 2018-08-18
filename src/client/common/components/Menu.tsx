import * as React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import ProfileOrLoginMenuItem from './ProfileOrLoginMenuItem';
import MenuItem from './MenuItem';
import RankingMenuItem from './RankingMenuItem';
import {User} from '../../users/domain/User';
import WebSocketConnectionIndicator from './WebSocketConnectionIndicator';
import * as logo from '../../assets/img/logo.png';
import {attemptLogout} from '../../users/actions';
import FontAwesome from './FontAwesome';
import {Dispatch} from "redux";
import {RouterState} from "connected-react-router";
import {CSSProperties} from "react";

const logoStyle: CSSProperties = {
    display: 'inline-block',
    height: 35,
    marginTop: -5,
};

interface MenuProps {
    user: User;
    isConnected: boolean;
    currentPath: string;
    onLogout: (() => void);
    progress: number;
}

interface MenuState {
    auth: { user: User },
    submissions: { stats: any },
    problems: { items: Array<object> },
    webSocketConnected: boolean
    router: RouterState
}

const Menu = (props: MenuProps) => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Toggle/>
            <a className="navbar-brand" href="/">
                <img src={logo} style={logoStyle}/>
                &nbsp;
                <WebSocketConnectionIndicator isConnected={props.isConnected}/>
            </a>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav role="navigation" pullRight id="menu">
                <MenuItem path="/" prefix="fas" icon="home" title="Home"/>
                <MenuItem path="/problems" prefix="far" icon="lightbulb" title="Problems"/>
                <RankingMenuItem/>
                {props.user ? (
                    <MenuItem path="/submissions" prefix="fas" icon="code" title="Submissions"/>
                ) : null}
                <MenuItem path="/codeOfConduct" prefix="far" icon="handshake" title="Honor Code"/>
                <NavItem href="https://jalgoarena.github.io/docs/" target="_blank">
                    <FontAwesome prefix="fas" name="book" lg={true}/> Docs
                </NavItem>
                <ProfileOrLoginMenuItem user={props.user} currentPath={props.currentPath} onLogout={props.onLogout}
                                        progress={props.progress}/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const mapStateToProps = (state: MenuState) => {
    let progress = 0;

    if (
        state.auth.user &&
        state.submissions.stats &&
        state.submissions.stats[state.auth.user.username] &&
        state.submissions.stats[state.auth.user.username].solved
    ) {
        let solved = parseInt(state.submissions.stats[state.auth.user.username].solved.length);
        progress = solved / state.problems.items.length * 100;
    }

    return {
        user: state.auth.user,
        isConnected: state.webSocketConnected,
        currentPath: state.router.location.pathname,
        progress,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => {
    return {
        onLogout: () => {
            dispatch<any>(attemptLogout());
        },
    };
};

const MenuPanel = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Menu);

export default MenuPanel;
