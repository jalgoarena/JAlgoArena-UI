import * as React from 'react';
import {Modal} from 'react-bootstrap';
import AceEditor from 'react-ace';

import 'brace/theme/chrome';
import logo from '../../assets/img/logo.png';
import {CSSProperties} from "react";

const logoStyle: CSSProperties = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle: CSSProperties = {
    height: 200
};

interface SourceCodeProps {
    show: boolean;
    onHide: (() => void)
}

const PairSourceCode = (props: SourceCodeProps) => (
    <Modal show={props.show || false} onHide={props.onHide}>
        <Modal.Header closeButton>
            <h2>{"Pair"}</h2>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <AceEditor
                mode="java"
                theme="chrome"
                value={`public class Pair {
    public Object first;
    public Object second;
}`}
                height="160px"
                width="100%"
                readOnly={true}
                fontSize={14}
                editorProps={{$blockScrolling: true}}
            />
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src={logo} className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);

export default PairSourceCode;