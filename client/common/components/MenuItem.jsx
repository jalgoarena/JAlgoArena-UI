// @flow

import React from "react";
import {NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';

const MenuItem = ({path, prefix, icon, title}: {path: string, prefix: string, icon: string, title: string}) => (
    <LinkContainer to={path}>
        <NavItem><FontAwesome prefix={prefix} name={icon} lg={true}/> {title}</NavItem>
    </LinkContainer>
);

export default MenuItem;