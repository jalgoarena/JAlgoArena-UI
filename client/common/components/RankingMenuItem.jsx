// @flow
import React from "react";
import {NavDropdown} from "react-bootstrap";

import FontAwesome from './FontAwesome';
import MenuItem from './MenuItem';
import {languages} from "../../config";

const RankingMenuItem = () => {
    let langRankingMenuItems = languages.map(
        lang => <MenuItem key={lang}
                          path={`/langRanking/${lang}`}
                          title={lang.charAt(0).toLocaleUpperCase() + lang.slice(1)}
                          icon="" prefix=""/>
    );

    return (
        <NavDropdown title={<span><FontAwesome prefix="fas" name="trophy" lg={true} id="ranking-nav-dropdown"/> Ranking</span>}>
            <MenuItem path="/userRanking" title="Users" icon="" prefix=""/>
            <MenuItem path="/teamRanking" title="Teams" icon="" prefix=""/>
            <MenuItem path="/regionRanking" title="Regions" icon="" prefix=""/>
            {langRankingMenuItems}
        </NavDropdown>
    );
};

export default RankingMenuItem;