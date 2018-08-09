import React from 'react';
import {Modal} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import logo from '../../assets/img/logo.png';

const logoStyle = {
    height: 40,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 350
};

const ProblemRank = ({problemRanking, problemId, show, onHide}) => {
    let ranking = problemRanking.map ? problemRanking : [];

    let rankingData = ranking.map((ranking, idx) =>
        Object.assign({}, ranking, {idx: idx + 1})
    );

    const options = {
        sizePerPage: 5,
        hideSizePerPage: true
    };

    return (
        <Modal show={show || false} onHide={onHide}>
            <Modal.Header closeButton>
                <h2>Problem Ranking - {problemId}</h2>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>
                <BootstrapTable data={rankingData} stripped hover pagination search options={options}>
                    <TableHeaderColumn isKey
                                       dataField='idx'>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='hacker'>Hacker</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'>Score</TableHeaderColumn>
                    <TableHeaderColumn dataField='elapsedTime'>Elapsed Time (ms)</TableHeaderColumn>
                </BootstrapTable>
            </Modal.Body>
            <Modal.Footer>
                <div className="col-md-offset-4 col-md-4">
                    <img src={logo} className="img-responsive" style={logoStyle} />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ProblemRank;
