// @flow

import React from 'react';
import * as _ from 'lodash';
import {Table} from 'react-bootstrap';

import TeamRankEntry from '../components/TeamRankEntry';

const RegionRanking = ({ranking}) => {
    let teams = _.groupBy(ranking, 'team');
    let teamsRank = _.orderBy(_.map(teams, (rankNodes, team) => {
        return {team: team, score: _.sumBy(rankNodes, 'score')};
    }), ['score'], ['desc']);

    let rankingNodes = teamsRank.map((teamRank, idx) =>
        <TeamRankEntry key={idx} idx={idx} team={teamRank.team} score={teamRank.score}/>
    );

    return <Table striped bordered condensed hover responsive>
        <thead>
        <tr>
            <th>#</th>
            <th>Team</th>
            <th>Score</th>
        </tr>
        </thead>
        <tbody>
            {rankingNodes}
        </tbody>
    </Table>;
};

export default RegionRanking;