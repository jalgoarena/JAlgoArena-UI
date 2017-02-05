// @flow

import React from 'react';

type UserRankInputType = {
    idx: number,
    hacker: string,
    score: number,
    team: string,
    region: string
}

const UserRank = ({idx, hacker, score, team, region}: UserRankInputType) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{hacker}</td>
        <td>{region}</td>
        <td>{team}</td>
        <td>{score}</td>
    </tr>
);

export default UserRank;
