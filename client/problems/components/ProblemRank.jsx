import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {fetchProblemRanking} from "../../ranking/actions/index";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import logo from '../../assets/img/logo.png';

const logoStyle = {
    height: 40,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 350
};

class ProblemRank extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onLoad(this.props.problemId);
    }

    render() {

        let ranking = this.props.problemRanking.map ? this.props.problemRanking : [];

        let rankingData = ranking.map((ranking, idx) =>
            Object.assign({}, ranking, {idx: idx + 1})
        );

        const options = {
            sizePerPage: 5,
            hideSizePerPage: true
        };

        return (
            <Modal show={this.props.show || false} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <h2>Problem Ranking - {this.props.problemId}</h2>
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
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        problemRanking: state.ranking.problemRanking
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (problemId) => {
            dispatch(fetchProblemRanking(problemId));
        }
    }
};

const ProblemRankModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemRank);

export default ProblemRankModal;
