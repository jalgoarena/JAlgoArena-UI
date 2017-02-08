// @flow

import React from 'react';
import * as _ from 'lodash';
import {Table} from 'react-bootstrap';

import RegionRankEntry from "../components/RegionRankEntry";

const RegionRanking = ({ranking}) => {
    let regions = _.groupBy(ranking, 'region');
    let regionsRank = _.orderBy(_.map(regions, (rankNodes, region) => {
        return {region: region, score: _.sumBy(rankNodes, 'score')};
    }), ['score'], ['desc']);

    let rankingNodes = regionsRank.map((regionRank, idx) =>
        <RegionRankEntry
            key={idx}
            idx={idx}
            region={regionRank.region}
            score={regionRank.score}
        />
    );

    return <Table striped bordered condensed hover responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Region</th>
            <th>Score</th>
        </tr>
        </thead>
        <tbody>
            {rankingNodes}
        </tbody>
    </Table>;
};

export default RegionRanking;