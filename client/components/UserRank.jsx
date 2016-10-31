import React from 'react';

const UserRank = ({idx, hacker, score, team, region}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{hacker}</td>
        <td>{region}</td>
        <td>{team}</td>
        <td>{score}</td>
    </tr>
);

export default UserRank;
