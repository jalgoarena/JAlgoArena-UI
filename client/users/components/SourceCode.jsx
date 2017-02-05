// @flow

import React from 'react';
import {Modal} from 'react-bootstrap';
import AceEditor from 'react-ace';

import 'brace/theme/chrome';

const logoStyle = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 450
};

type SourceCodeInput = {
    show: boolean,
    onHide: () => void,
    sourceCode: string,
    problemId: string
}

const SourceCode = ({show, onHide, sourceCode, problemId}: SourceCodeInput) => (
    <Modal show={show || false} onHide={onHide} bsSize="large">
        <Modal.Header closeButton>
            <h2>{problemId}</h2>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <AceEditor
                mode="java"
                theme="chrome"
                value={sourceCode}
                height="400px"
                width="100%"
                readOnly={true}
                fontSize={14}
                editorProps={{$blockScrolling: true}}
            />
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src="../img/logo.png" className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);

export default SourceCode;