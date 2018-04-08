// @flow

import React from "react";
import {NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';
import User from "../../users/domain/User";

const ProfileOrLoginMenuItem = ({user}: {user: User}) => (
    user
        ? <LinkContainer to="/profile">
            <NavItem><FontAwesome prefix="fas" name="user" lg={true}/> Profile</NavItem>
        </LinkContainer>
        : <LinkContainer to="/login">
            <NavItem><FontAwesome prefix="fas" name="sign-in-alt" lg={true}/> Login</NavItem>
        </LinkContainer>
);

export default ProfileOrLoginMenuItem;