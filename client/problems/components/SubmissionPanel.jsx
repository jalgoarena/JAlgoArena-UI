// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import FontAwesome from '../../common/components/FontAwesome';

import RunButton from './RunButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';
import Problem from "../domain/Problem";

type SubmissionPanelInputType = {
    problem: Problem,
    sourceCode: string,
    userId: string,
    onRun: (string, string, string) => void,
    isAlreadySolved: boolean
}

const SubmissionPanel = ({problem, sourceCode, userId, onRun, isAlreadySolved}: SubmissionPanelInputType) => {

    const button = isAlreadySolved
        ? <Link to="/submissions" className="pulse-button btn btn-lg btn-success pull-right">
            <FontAwesome prefix="fas" name="code"/> Go to submissions
        </Link>
        : <RunButton
            problemId={problem.id}
            sourceCode={sourceCode}
            userId={userId}
            onRun={onRun}
        />;

    return <div>
        {button}
        <TimeLimit timeLimit={problem.timeLimit}/>
        <br />
        <MemoryLimit />
    </div>;
};

export default SubmissionPanel;
