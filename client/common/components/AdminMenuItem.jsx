// @flow

import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import User from '../../users/domain/User';

const AdminMenuItem = ({user, currentPath}: {user: User, currentPath: string}) => (
    user && user.role === 'ADMIN'
        ? <NavDropdown title={<span><FontAwesome prefix="fas" name="cogs" lg={true} onSelect={() => null}/> Admin</span>}>
            <MenuItem path="/problemsAdmin" prefix="fas" icon="book" title="Problems" currentPath={currentPath}/>
            <MenuItem path="/usersAdmin" prefix="fas" icon="user" title="Users"  currentPath={currentPath}/>
        </NavDropdown>
        : null
);

export default AdminMenuItem;