// @flow

import React from 'react';
import {Button, Row, ButtonToolbar} from 'react-bootstrap';

import FontAwesome from '../../common/components/FontAwesome';
import {Submission} from "../domain/Submission";

const submissionStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

type SubmissionInput = {
    submission: Submission,
    username: string,
    onDelete: (submissionId: ?string) => void,
    onRerun: (string, string, string, string) => void,
    onShowSourceCode: () => void
}

const SubmissionNode = ({submission, username, onDelete, onRerun, onShowSourceCode}: SubmissionInput) => (
    <div style={submissionStyle}>
        <Row>
            <h4 className="text-success">{submission.problemId} <span
                className="pull-right">{`${username}:${submission.userId}`}</span></h4>
        </Row>
        <Row>

            <ButtonToolbar className="pull-right">
                <Button bsStyle="success"
                        onClick={() => onShowSourceCode()}>
                    <FontAwesome name="bars"/> Source Code
                </Button>
                <Button bsStyle="info"
                        onClick={() =>
                            onRerun(
                                submission.sourceCode,
                                submission.userId,
                                submission.problemId,
                                submission.language
                            )
                        }>
                    <FontAwesome name="refresh"/> Re-Run
                </Button>
                <Button bsStyle="danger"
                        onClick={() => onDelete(submission.id)}>
                    <FontAwesome name="remove"/> Delete
                </Button>
            </ButtonToolbar>
            <span className="text-muted">Elapsed Time:</span> <span className="text-primary">{submission.elapsedTime}
            ms</span><br />
            <span className="text-muted">Source Code length:</span> <span
            className="text-primary">{submission.sourceCode ? submission.sourceCode.length : 0} chars</span><br />
            <span className="text-muted">Status:</span> <span className="text-primary">{submission.statusCode}</span><br />
            <span className="text-muted">Language:</span> <span className="text-primary">{submission.language}</span>
        </Row>
    </div>
);


export default SubmissionNode;