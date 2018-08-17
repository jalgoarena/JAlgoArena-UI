import * as React from 'react';
import {Modal} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import logo from '../../assets/img/logo.png';
import {ProblemRankingEntry} from "../../ranking/domain/ProblemRankingEntry";

const logoStyle = {
    height: 40,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 350
};

interface ProblemRankProps {
    problemRanking: Array<ProblemRankingEntry>,
    problemId: string
    show: boolean;
    onHide: (() => void)
}

const ProblemRank = (props: ProblemRankProps) => {
    let ranking = props.problemRanking.map ? props.problemRanking : [];

    let rankingData = ranking.map((ranking, idx) =>
        ({...ranking, idx: idx + 1})
    );

    const options = {
        sizePerPage: 5,
        hideSizePerPage: true
    };

    return (
        <Modal show={props.show || false} onHide={props.onHide}>
            <Modal.Header closeButton>
                <h2>Problem Ranking - {props.problemId}</h2>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>
                <BootstrapTable data={rankingData} striped hover pagination search options={options}>
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
