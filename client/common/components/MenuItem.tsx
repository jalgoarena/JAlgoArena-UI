import * as React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from './FontAwesome';

const MenuItem = ({
  path,
  prefix,
  icon,
  title,
  currentPath,
}: {
  path: string;
  prefix: string;
  icon: string;
  title: string;
  currentPath: string;
}) => (
  <LinkContainer to={path} isActive={(match) => match && match.isExact}>
    <NavItem>
      <FontAwesome prefix={prefix} name={icon} lg={true} /> {title}
    </NavItem>
  </LinkContainer>
);

export default MenuItem;
