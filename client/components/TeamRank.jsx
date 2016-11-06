import React from 'react';

const TeamRank = ({idx, team, score}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{team}</td>
        <td>{score}</td>
    </tr>
);

export default TeamRank;
