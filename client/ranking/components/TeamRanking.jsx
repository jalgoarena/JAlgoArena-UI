// @flow

import React from 'react';
import * as _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {RankingEntry} from "../domain/RankingEntry";

const TeamRanking = ({ranking}: {ranking: Array<RankingEntry>}) => {
    let teams = _.groupBy(ranking, 'team');
    let teamsRank = _.orderBy(_.map(teams, (rankNodes, team) => {
        return {team: team, score: _.sumBy(rankNodes, 'score'), size: rankNodes.length};
    }), ['score'], ['desc']);

    let teamRankingData = teamsRank.map((teamRank, idx) => {
            return {
                place: idx + 1,
                team: teamRank.team,
                score: teamRank.score,
                size: teamRank.size,
                avg: parseInt(teamRank.score / teamRank.size)
            };
        }
    );

    return <BootstrapTable data={teamRankingData} stripped hover pagination search>
        <TableHeaderColumn isKey
                           width={'50'}
                           dataSort={true}
                           dataField='place'>#</TableHeaderColumn>
        <TableHeaderColumn dataField='team'
                           filter={ { type: 'TextFilter', delay: 1000 } }
                           dataSort={true}>Team</TableHeaderColumn>
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

export default TeamRanking;