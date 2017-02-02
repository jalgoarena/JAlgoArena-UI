import React from "react";
import {NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';

const ProfileOrLoginMenuItem = ({user}) => (
    user
        ? <LinkContainer to="/profile">
            <NavItem><FontAwesome name="user" lg={true}/> Profile</NavItem>
        </LinkContainer>
        : <LinkContainer to="/login">
            <NavItem><FontAwesome name="sign-in" lg={true}/> Login</NavItem>
        </LinkContainer>
);

export default ProfileOrLoginMenuItem;