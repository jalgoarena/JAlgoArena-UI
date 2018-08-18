import * as React from 'react';
import * as _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {RankingEntry} from "../domain/RankingEntry";

interface RegionRankingTableProps {
    ranking: Array<RankingEntry>
}

export const RegionRankingTable = (props: RegionRankingTableProps) => {
    let regions = _.groupBy(props.ranking, 'region');
    let regionsRank = _.orderBy(_.map(regions, (rankNodes, region) => {
        return {region: region, score: _.sumBy(rankNodes, 'score'), size: rankNodes.length};
    }), ['score'], ['desc']);

    let regionRankingData = regionsRank.map((regionRank, idx) => {
            return {
                place: idx + 1,
                region: regionRank.region,
                score: regionRank.score,
                size: regionRank.size,
                avg: Math.round(regionRank.score / regionRank.size)
            };
        }
    );

    return <BootstrapTable data={regionRankingData} striped hover pagination search>
        <TableHeaderColumn isKey
                           width={'50'}
                           dataSort
                           dataField='place'>#</TableHeaderColumn>
        <TableHeaderColumn dataField='region'
                           dataSort>Region</TableHeaderColumn>
        <TableHeaderColumn dataField='score'
                           dataSort>Score</TableHeaderColumn>
        <TableHeaderColumn dataField='size'
                           dataSort>Team Size</TableHeaderColumn>
        <TableHeaderColumn dataField='avg'
                           dataSort>Avg</TableHeaderColumn>
    </BootstrapTable>;
};
