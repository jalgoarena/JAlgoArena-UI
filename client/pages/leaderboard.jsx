import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {showModal, fetchRanking} from "../actions/index";

class Leaderboard extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        let rankNodes = ranking.map((ranking, idx) =>
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{ranking.hacker}</td>
                <td>{ranking.score}</td>
            </tr>
        );

        return (
            <Grid>
                <Col mdOffset={3} md={6}>
                    <PageHeader>Ranking</PageHeader>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Problem ID</th>
                            <th>Used Time (ms)</th>
                            <th>Used Memory (kb)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rankNodes}
                        </tbody>
                    </Table>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        showModal: state.showModal,
        ranking: state.ranking
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(showModal());
            dispatch(fetchRanking());
        }
    }
};

const RankPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);

export default RankPage;