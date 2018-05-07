// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import {languages} from "../../config";

const RankingMenuItem = ({currentPath}: {currentPath: string}) => {
    let langRankingMenuItems = languages.map(
        lang => <MenuItem key={lang}
                          path={`/langRanking/${lang}`}
                          title={lang.charAt(0).toLocaleUpperCase() + lang.slice(1)}
                          icon="" prefix="" currentPath={currentPath}/>
    );

    return (
        <NavDropdown title={<span><FontAwesome prefix="fas" name="trophy" lg={true} onSelect={() => null}/> Ranking</span>}>
            <MenuItem path="/userRanking" title="Users" icon="" prefix="" currentPath={currentPath}/>
            <MenuItem path="/teamRanking" title="Teams" icon="" prefix="" currentPath={currentPath}/>
            <MenuItem path="/regionRanking" title="Regions" icon="" prefix="" currentPath={currentPath}/>
            {langRankingMenuItems}
        </NavDropdown>
    );
};

export default RankingMenuItem;