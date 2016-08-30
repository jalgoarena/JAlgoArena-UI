import React from 'react';

const UserProblemRank = ({idx, hacker, score, elapsedTime}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{hacker}</td>
        <td>{score}</td>
        <td>{elapsedTime}</td>
    </tr>
);

export default UserProblemRank;
