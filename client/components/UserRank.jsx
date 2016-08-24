import React from 'react';

const UserRank = ({idx, hacker, score}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{hacker}</td>
        <td>{score}</td>
    </tr>
);

export default UserRank;
