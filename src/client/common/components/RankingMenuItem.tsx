import * as React from 'react';
import {NavDropdown} from 'react-bootstrap';
import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import {MenuItem as ReactMenuItem} from 'react-bootstrap';


const RankingMenuItem = () => (
    <NavDropdown
        id="ranking-dropdown"
        // @ts-ignore
        title={
            <span>
        <FontAwesome prefix="fas" name="trophy" lg={true}/> Ranking
      </span>
        }
    >
        <MenuItem path="/userRanking" title="Users" icon="" prefix=""/>
        <ReactMenuItem divider/>
        <MenuItem path="/teamRanking" title="Teams" icon="" prefix=""/>
        <ReactMenuItem divider/>
        <MenuItem path="/regionRanking" title="Regions" icon="" prefix=""/>
    </NavDropdown>
);

export default RankingMenuItem;
