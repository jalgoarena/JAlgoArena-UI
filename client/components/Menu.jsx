import React from "react";
import {Navbar, Nav, NavItem, NavDropdown} from "react-bootstrap";
import FontAwesome from './FontAwesome';
import {LinkContainer} from 'react-router-bootstrap';

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

export default class Menu extends React.Component {

    render() {
        return (
            <Navbar fixedTop fluid>
                <Navbar.Header>
                    <Navbar.Toggle/>
                    <a className="navbar-brand" href="/"><img src="img/logo.png" style={logoStyle}/></a>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav role="navigation" pullRight id="menu">
                        <LinkContainer to="/">
                            <NavItem><FontAwesome name="home" lg={true}/> Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/problems">
                            <NavItem><FontAwesome name="lightbulb-o" lg={true}/> Problems</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/leaderboard">
                            <NavItem><FontAwesome name="trophy" lg={true}/> Rank</NavItem>
                        </LinkContainer>
                        {this.profileOrLoginMenuItem()}
                        {this.adminMenuItem()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    adminMenuItem() {
        if (!this.props.store.getState().userAuthSession.user) {
            return null;
        }

        return this.props.store.getState().userAuthSession.user.isAdmin
            ? <NavDropdown title={<span><FontAwesome name="cogs" lg={true}/> Admin</span>} id="basic-nav-dropdown">
                <LinkContainer to="/admin">
                    <NavItem><FontAwesome name="code"/> Submissions</NavItem>
                </LinkContainer>
                <LinkContainer to="/newProblem">
                    <NavItem><FontAwesome name="book"/> New Problem</NavItem>
                </LinkContainer>
            </NavDropdown>
            : null;
    }

    profileOrLoginMenuItem() {
        return this.props.store.getState().userAuthSession.user
            ? <LinkContainer to="/profile">
                <NavItem><FontAwesome name="user" lg={true}/> Profile</NavItem>
            </LinkContainer>
            : <LinkContainer to="/login">
                <NavItem><FontAwesome name="sign-in" lg={true}/> Login</NavItem>
            </LinkContainer>;
    }
}
