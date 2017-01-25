import React from 'react';
import {Button, Row, ButtonToolbar} from 'react-bootstrap';

import FontAwesome from '../../common/components/FontAwesome';

const submissionStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

const Submission = ({sourceCode, problemId, username, userId, elapsedTime, statusCode, submissionId, language, onDelete, onRerun, onShowSourceCode}) => (
    <div style={submissionStyle}>
        <Row>
            <h4 className="text-success">{problemId} <span
                className="pull-right">{`${username}:${userId}`}</span></h4>
        </Row>
        <Row>

            <ButtonToolbar className="pull-right">
                <Button bsStyle="success"
                        onClick={() => onShowSourceCode()}>
                    <FontAwesome name="bars"/> Source Code
                </Button>
                <Button bsStyle="info"
                        onClick={() =>
                            onRerun(sourceCode, userId, problemId, language)
                        }>
                    <FontAwesome name="refresh"/> Re-Run
                </Button>
                <Button bsStyle="danger"
                        onClick={() => onDelete(submissionId)}>
                    <FontAwesome name="remove"/> Delete
                </Button>
            </ButtonToolbar>
            <span className="text-muted">Elapsed Time:</span> <span className="text-primary">{elapsedTime}
            ms</span><br />
            <span className="text-muted">Source Code length:</span> <span
            className="text-primary">{sourceCode ? sourceCode.length : 0} chars</span><br />
            <span className="text-muted">Status:</span> <span className="text-primary">{statusCode}</span><br />
            <span className="text-muted">Language:</span> <span className="text-primary">{language}</span>
        </Row>
    </div>
);


export default Submission;