// @flow

import React from "react";
import {NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';
import User from "../../users/domain/User";
import MenuItem from "./MenuItem";

const ProfileOrLoginMenuItem = ({user, currentPath, onLogout}: { user: User, currentPath: string, onLogout: () => void }) => (
    user
        ? <NavDropdown
            title={<span><FontAwesome prefix="fas" name="user" lg={true}/> {user.username} </span>}>
            <MenuItem path={"/profile/" + user.username} title="Profile" icon="" prefix="" currentPath={currentPath}/>
            <NavItem onClick={onLogout}>Logout</NavItem>
        </NavDropdown>
        : <LinkContainer to="/login" active={"/login" === currentPath} isActive={match => match && match.isExact}>
            <NavItem><FontAwesome prefix="fas" name="sign-in-alt" lg={true}/> Login</NavItem>
        </LinkContainer>
);

export default ProfileOrLoginMenuItem;