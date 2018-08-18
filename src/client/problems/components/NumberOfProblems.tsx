import * as React from 'react';
import {Modal, Table} from 'react-bootstrap';
import * as logo from '../../assets/img/logo.png';
import {CSSProperties} from "react";

const logoStyle: CSSProperties = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle: CSSProperties = {
    height: 200
};

interface NumberOfProblemsProps {
    show: boolean,
    onHide: () => void,
    easy: number,
    medium: number,
    hard: number
}

const NumberOfProblems = (props: NumberOfProblemsProps) => (
    <Modal show={props.show || false} onHide={props.onHide}>
        <Modal.Header closeButton>
            <h2>{"Number Of Problems"}</h2>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
            <Table condensed hover responsive>
                <thead>
                <tr>
                    <th>Level</th>
                    <th>Count</th>
                    <th>Max points</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Easy</td>
                    <td>{props.easy}</td>
                    <td>{props.easy * 10 + props.easy}</td>
                </tr>
                <tr>
                    <td>Medium</td>
                    <td>{props.medium}</td>
                    <td>{props.medium * 30 + props.medium}</td>
                </tr>
                <tr>
                    <td>Hard</td>
                    <td>{props.hard}</td>
                    <td>{props.hard * 50 + props.hard}</td>
                </tr>
                <tr>
                    <td> </td>
                    <td>{props.easy + props.medium + props.hard}</td>
                    <td>{props.easy * 10 + props.easy + props.medium * 30 + props.medium + props.hard * 50 + props.hard}</td>
                </tr>
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src={logo} className="img-responsive" style={logoStyle}/>
            </div>
        </Modal.Footer>
    </Modal>
);

export default NumberOfProblems;