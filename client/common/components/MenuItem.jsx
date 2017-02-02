import React from "react";
import {NavItem} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';

const MenuItem = ({path, icon, title}) => (
    <LinkContainer to={path}>
        <NavItem><FontAwesome name={icon} lg={true}/> {title}</NavItem>
    </LinkContainer>
);

export default MenuItem;