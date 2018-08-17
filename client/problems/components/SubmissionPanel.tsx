import * as React from 'react';
import {Link} from 'react-router-dom';

import FontAwesome from '../../common/components/FontAwesome';

import RunButton from './RunButton';
import MemoryLimit from './MemoryLimit';
import TimeLimit from './TimeLimit';
import Problem from "../domain/Problem";
import {ButtonToolbar} from "react-bootstrap";
import SaveButton from "./SaveButton";

interface SubmissionPanelProps {
    problem: Problem,
    sourceCode: string,
    savedSourceCode: string | null | undefined,
    userId: string | null | undefined,
    onRun: (sourceCode: string, problemId: string, userId: string) => void,
    onSave: (sourceCode: string, problemId: string) => void,
    isAlreadySolved: boolean
}

const SubmissionPanel = (props: SubmissionPanelProps) => {

    const button = props.isAlreadySolved
        ? <Link to="/submissions" className="pulse-button btn btn-lg btn-success pull-right">
            <FontAwesome prefix="fas" name="code"/> Go to submissions
        </Link>
        : <ButtonToolbar>
            <RunButton
                sourceCode={props.sourceCode}
                problemId={props.problem.id}
                userId={props.userId}
                onRun={props.onRun}
            />
            <SaveButton
                sourceCode={props.sourceCode}
                savedSourceCode={props.savedSourceCode}
                problemId={props.problem.id}
                onSave={props.onSave}
            />
        </ButtonToolbar>;

    return <div>
        {button}
        <TimeLimit timeLimit={props.problem.timeLimit}/>
        <br/>
        <MemoryLimit/>
    </div>;
};

export default SubmissionPanel;
