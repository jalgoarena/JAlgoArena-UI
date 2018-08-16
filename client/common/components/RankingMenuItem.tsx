import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import { MenuItem as ReactMenuItem} from 'react-bootstrap';


const RankingMenuItem = ({ currentPath }: { currentPath: string }) => (
  <NavDropdown
    id="ranking-dropdown"
    // @ts-ignore
    title={
      <span>
        <FontAwesome prefix="fas" name="trophy" lg={true} /> Ranking
      </span>
    }
  >
    <MenuItem path="/userRanking" title="Users" icon="" prefix="" currentPath={currentPath} />
    <ReactMenuItem divider />
    <MenuItem path="/teamRanking" title="Teams" icon="" prefix="" currentPath={currentPath} />
    <ReactMenuItem divider />
    <MenuItem path="/regionRanking" title="Regions" icon="" prefix="" currentPath={currentPath} />
  </NavDropdown>
);

export default RankingMenuItem;
