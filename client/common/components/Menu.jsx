import React from "react";
import {Navbar, Nav, NavItem, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

import FontAwesome from './FontAwesome';

const logoStyle = {
    display: "inline-block",
    height: 35,
    marginTop: -5
};

class Menu extends React.Component {

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
        if (this.props.auth == null || this.props.auth.user == null) {
            return null;
        }

        return this.props.auth.user.role === 'ADMIN'
            ? <NavDropdown title={<span><FontAwesome name="cogs" lg={true}/> Admin</span>} id="basic-nav-dropdown">
                <LinkContainer to="/submissionsAdmin">
                    <NavItem><FontAwesome name="code"/> Submissions</NavItem>
                </LinkContainer>
                <LinkContainer to="/problemsAdmin">
                    <NavItem><FontAwesome name="book"/> Problems</NavItem>
                </LinkContainer>
                <LinkContainer to="/usersAdmin">
                    <NavItem><FontAwesome name="user"/> Users</NavItem>
                </LinkContainer>
            </NavDropdown>
            : null;
    }

    profileOrLoginMenuItem() {
        return this.props.auth.user
            ? <LinkContainer to="/profile">
                <NavItem><FontAwesome name="user" lg={true}/> Profile</NavItem>
            </LinkContainer>
            : <LinkContainer to="/login">
                <NavItem><FontAwesome name="sign-in" lg={true}/> Login</NavItem>
            </LinkContainer>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        routing: state.routing
    };
};

const MenuPanel = connect(
    mapStateToProps
)(Menu);

export default MenuPanel;