// @flow

import React from 'react';

const RegionRankEntry = ({idx, region, score}:
    {idx: number, region: string, score: number}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{region}</td>
        <td>{score}</td>
    </tr>
);

export default RegionRankEntry;
