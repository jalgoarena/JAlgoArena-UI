// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import FontAwesome from '../../common/components/FontAwesome';

import RunButton from './RunButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';
import Problem from "../domain/Problem";
import {ButtonToolbar} from "react-bootstrap";
import SaveButton from "./SaveButton";

type SubmissionPanelInputType = {
    problem: Problem,
    sourceCode: string,
    savedSourceCode: string,
    userId: string,
    onRun: (string, string, string) => void,
    onSave: (string, string) => void,
    isAlreadySolved: boolean
}

const SubmissionPanel = ({problem, sourceCode, savedSourceCode, userId, onRun, onSave, isAlreadySolved}: SubmissionPanelInputType) => {

    const button = isAlreadySolved
        ? <Link to="/submissions" className="pulse-button btn btn-lg btn-success pull-right">
            <FontAwesome prefix="fas" name="code"/> Go to submissions
        </Link>
        : <ButtonToolbar>
            <RunButton
                sourceCode={sourceCode}
                problemId={problem.id}
                userId={userId}
                onRun={onRun}
            />
            <SaveButton
                sourceCode={sourceCode}
                savedSourceCode={savedSourceCode}
                problemId={problem.id}
                onSave={onSave}
            />
        </ButtonToolbar>;

    return <div>
        {button}
        <TimeLimit timeLimit={problem.timeLimit}/>
        <br/>
        <MemoryLimit/>
    </div>;
};

export default SubmissionPanel;
