// @flow

import React from 'react';
import {NumberOfSolutionsPerLanguageEntry} from "../domain/NumberOfSolutionsPerLanguageEntry";

type UserRankInputType = {
    idx: number,
    hacker: string,
    score: number,
    team: string,
    region: string,
    numberOfSolutionsPerLanguage: Array<NumberOfSolutionsPerLanguageEntry>
}

const UserRank = ({idx, hacker, score, team, region, numberOfSolutionsPerLanguage}: UserRankInputType) => {

    let javaItem = numberOfSolutionsPerLanguage.find(item => item.first === 'java') || {second: 0};
    let kotlinItem = numberOfSolutionsPerLanguage.find(item => item.first === 'kotlin') || {second: 0};

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{hacker}</td>
            <td>{region}</td>
            <td>{team}</td>
            <td>{score}</td>
            <td>{javaItem.second}</td>
            <td>{kotlinItem.second}</td>
        </tr>
    );
};

export default UserRank;
