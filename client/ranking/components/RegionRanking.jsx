// @flow

import React from 'react';
import * as _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {RankingEntry} from "../domain/RankingEntry";

const RegionRanking = ({ranking}: {ranking: Array<RankingEntry>}) => {
    let regions = _.groupBy(ranking, 'region');
    let regionsRank = _.orderBy(_.map(regions, (rankNodes, region) => {
        return {region: region, score: _.sumBy(rankNodes, 'score'), size: rankNodes.length};
    }), ['score'], ['desc']);

    let regionRankingData = regionsRank.map((regionRank, idx) => {
            return {
                place: idx + 1,
                region: regionRank.region,
                score: regionRank.score,
                size: regionRank.size,
                avg: parseInt(regionRank.score / regionRank.size)
            };
        }
    );

    return <BootstrapTable data={regionRankingData} stripped hover pagination search>
        <TableHeaderColumn isKey
                           width={50}
                           dataSort={true}
                           dataField='place'>#</TableHeaderColumn>
        <TableHeaderColumn dataField='region'
                           filter={ { type: 'TextFilter', delay: 1000 } }
                           dataSort={true}>Region</TableHeaderColumn>
        <TableHeaderColumn dataField='score'
                           filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '>', '<=' ]
                                       }}
                           dataSort={true}>Score</TableHeaderColumn>
        <TableHeaderColumn dataField='size'
                           filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '>', '<=' ]
                                       }}
                           dataSort={true}>Team Size</TableHeaderColumn>
        <TableHeaderColumn dataField='avg'
                           filter={ {
                                            type: 'NumberFilter',
                                            delay: 1000,
                                            numberComparators: [ '>', '<=' ]
                                       }}
                           dataSort={true}>Avg</TableHeaderColumn>
    </BootstrapTable>;
};

export default RegionRanking;