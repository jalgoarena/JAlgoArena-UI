import React from 'react';
import {Table, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import UserProblemRank from './UserProblemRank';
import {fetchProblemRanking} from "../../ranking/actions/index";

const logoStyle = {
    height: 50,
    marginBottom: 15
};

const modalBodyStyle = {
    height: 150
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

        let rankNodes = ranking.map((ranking, idx) =>
            <UserProblemRank
                key={idx}
                idx={idx}
                hacker={ranking.hacker}
                score={ranking.score}
                elapsedTime={ranking.elapsedTime}
                language={ranking.language}
            />
        );

        return (
            <Modal show={this.props.show || false} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <h2>Problem Ranking - {this.props.problemId}</h2>
                </Modal.Header>
                <Modal.Body style={modalBodyStyle}>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Hacker</th>
                            <th>Score</th>
                            <th>Elapsed Time (ms)</th>
                            <th>Language</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rankNodes}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-md-offset-4 col-md-4">
                        <img src="../img/logo.png" className="img-responsive" style={logoStyle} />
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
