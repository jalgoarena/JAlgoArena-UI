import React from 'react';

const RegionRank = ({idx, region, score}) => (
    <tr>
        <td>{idx + 1}</td>
        <td>{region}</td>
        <td>{score}</td>
    </tr>
);

export default RegionRank;
