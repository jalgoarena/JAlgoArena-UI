// @flow

import React from 'react';

const TeamRankEntry = ({idx, team, score}: {idx: number, team: string, score: number}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{team}</td>
        <td>{score}</td>
    </tr>
);

export default TeamRankEntry;
