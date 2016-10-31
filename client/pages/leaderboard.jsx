import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchRanking} from "../actions/index";
import UserRank from '../components/UserRank';

class Leaderboard extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {

        let ranking = this.props.ranking.map ? this.props.ranking : [];

        let rankNodes = ranking.map((user, idx) =>
            <UserRank key={idx} idx={idx} hacker={user.hacker} score={user.score} region={user.region} team={user.team} />
        );

        return (
            <Grid>
                <Col mdOffset={3} md={6}>
                    <PageHeader>Ranking</PageHeader>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Hacker</th>
                            <th>Region</th>
                            <th>Team</th>
                            <th>Score</th>
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
        ranking: state.ranking
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchRanking());
        }
    }
};

const RankPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);

export default RankPage;
