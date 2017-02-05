// @flow

import React from 'react';

type UserProblemRankInputType = {
    idx: number,
    hacker: string,
    score: number,
    elapsedTime: number,
    language: string
}

const UserProblemRank = ({idx, hacker, score, elapsedTime, language}: UserProblemRankInputType) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{hacker}</td>
        <td>{score}</td>
        <td>{elapsedTime}</td>
        <td>{language}</td>
    </tr>
);

export default UserProblemRank;
