// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import ReactMenuItem from "react-bootstrap/es/MenuItem";

const RankingMenuItem = ({currentPath}: { currentPath: string }) => (
    <NavDropdown
        title={<span><FontAwesome prefix="fas" name="trophy" lg={true}/> Ranking</span>}>
        <MenuItem path="/userRanking" title="Users" icon="" prefix="" currentPath={currentPath}/>
        <ReactMenuItem divider/>
        <MenuItem path="/teamRanking" title="Teams" icon="" prefix="" currentPath={currentPath}/>
        <ReactMenuItem divider/>
        <MenuItem path="/regionRanking" title="Regions" icon="" prefix="" currentPath={currentPath}/>
    </NavDropdown>
);


export default RankingMenuItem;