// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';

const RankingMenuItem = () => (
    <NavDropdown title={<span><FontAwesome name="trophy" lg={true}/> Ranking</span>} id="basic-nav-dropdown">
        <MenuItem path="/userRanking" title="Users"/>
        <MenuItem path="/teamRanking" title="Teams"/>
        <MenuItem path="/regionRanking" title="Regions"/>
    </NavDropdown>
);

export default RankingMenuItem;