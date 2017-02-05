// @flow

import React from 'react';
import {Link} from 'react-router';

import FontAwesome from '../../common/components/FontAwesome';

import RunButton from './RunButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';
import Problem from "../domain/Problem";

type SubmissionPanelInputType = {
    problem: Problem,
    sourceCode: string,
    userId: string,
    onRun: (string, string, string, string) => void,
    activeLanguage: string,
    isAlreadySolved: boolean
}

const SubmissionPanel = ({problem, sourceCode, userId, onRun, activeLanguage, isAlreadySolved}: SubmissionPanelInputType) => {

    const button = isAlreadySolved
        ? <Link to="/problems" className="pulse-button btn btn-lg btn-success pull-right">
            <FontAwesome name="reply"/> Back to Problems
        </Link>
        : <RunButton
            problemId={problem.id}
            sourceCode={sourceCode}
            userId={userId}
            language={activeLanguage}
            onRun={onRun}
        />;

    return <div>
        {button}
        <TimeLimit timeLimit={problem.timeLimit}/>
        <br />
        <MemoryLimit memoryLimit={problem.memoryLimit}/>
    </div>;
};

export default SubmissionPanel;
