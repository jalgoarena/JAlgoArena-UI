// @flow

import React from 'react';
import {Modal, Table} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

const logoStyle = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 200
};

const NumberOfProblems = ({show, onHide, easy, medium, hard}: {show: boolean, onHide: () => void, easy: number, medium: number, hard: number}) => (
    <Modal show={show || false} onHide={onHide}>
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
                    <td>{easy}</td>
                    <td>{easy*10+easy}</td>
                </tr>
                <tr>
                    <td>Medium</td>
                    <td>{medium}</td>
                    <td>{medium*30+medium}</td>
                </tr>
                <tr>
                    <td>Hard</td>
                    <td>{hard}</td>
                    <td>{hard*50+hard}</td>
                </tr>
                <tr>
                    <td> </td>
                    <td>{easy+ medium + hard}</td>
                    <td>{easy*10+easy+medium*30+medium+hard*50+hard}</td>
                </tr>
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <div className="col-md-offset-4 col-md-4">
                <img src={logo} className="img-responsive" style={logoStyle} />
            </div>
        </Modal.Footer>
    </Modal>
);

export default NumberOfProblems;