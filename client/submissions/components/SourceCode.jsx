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

const SourceCode = ({show, onHide, sourceCode, problemId, userId}) => (
    <Modal show={show || false} onHide={onHide}>
        <Modal.Header closeButton>
            <h2>{problemId + ":" + userId}</h2>
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