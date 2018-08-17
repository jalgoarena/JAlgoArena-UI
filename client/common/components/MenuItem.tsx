import * as React from 'react';
import {NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from './FontAwesome';

interface MenuItemProps {
    path: string;
    prefix: string;
    icon: string;
    title: string;
}

const MenuItem = (props: MenuItemProps) => (
    <LinkContainer to={props.path} isActive={(match) => match && match.isExact}>
        <NavItem>
            <FontAwesome prefix={props.prefix} name={props.icon} lg={true}/> {props.title}
        </NavItem>
    </LinkContainer>
);

export default MenuItem;
