// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import User from '../../users/domain/User';

const AdminMenuItem = ({user}: {user: User}) => (
    user && user.role === 'ADMIN'
        ? <NavDropdown title={<span><FontAwesome name="cogs" lg={true}/> Admin</span>} id="basic-nav-dropdown">
            <MenuItem path="/problemsAdmin" icon="book" title="Problems"/>
            <MenuItem path="/usersAdmin" icon="user" title="Users"/>
        </NavDropdown>
        : null
);

export default AdminMenuItem;